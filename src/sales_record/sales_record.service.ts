import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateSalesRecordDto,
  updatePaymentStatusDto,
} from './dto/create-sales_record.dto';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';
import { generateUniqueString } from '../utils/func';
import { error } from 'console';
import * as nodemailer from 'nodemailer';
import { formatDate } from 'src/config';

@Injectable()
export class SalesRecordService {
  constructor(private prisma: PrismaService) { }
  private transporter = nodemailer.createTransport({
    host: 'mail.blindsandcurtains.ae',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ADMIN_MAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });
  async Add_sales_record(data: CreateSalesRecordDto) {

    try {
      const {
        amount,
        shippment_Fee: shipmentFee,
        orderedProductDetails: updatedProducts,
        user_email,
        address,

        ...extractedData
      } = data;
      let orderId = generateUniqueString();

      var myHeaders: Headers = new Headers();
      myHeaders.append(
        'Authorization',
        `Token ${process.env.PAYMOB_SECRET_KEY}`,
      );
      myHeaders.append('Content-Type', 'application/json');

      const staticProduct = {
        name: 'Shipping Fee',
        price:
          shipmentFee === 'Free' || shipmentFee === 'undefine'
            ? 0
            : Number(shipmentFee),
        description: 'Shipping Fee',
      };

      let raw = JSON.stringify({
        amount: amount * 100,
        currency: process.env.PAYMOD_CURRENCY,
        payment_methods: [21903, 59867,59865,26884],
        items: [...updatedProducts, staticProduct].map((item: any) => ({
          ...item,
          description: item.description?.slice(0, 255),
          amount: (item.discountPrice ? item.discountPrice : item.price) * 100,
        })),
        billing_data: {
          ...extractedData,
          email: user_email,
          amount: amount * 100,
        },
        special_reference: orderId,
        redirection_url: `${process.env.FRONTEND_URL}/thanks`,
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow' as RequestRedirect,
      };
      const response = await fetch(
        'https://uae.paymob.com/v1/intention/',
        requestOptions,
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData, 'errorData');
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const result = await response.json();

      const transaction = await this.prisma.$transaction(async (prisma) => {
        for (const product of data.orderedProductDetails) {
          console.log(product.id, 'id');
          const existingProduct = await prisma.products.findUnique({
            where: { id: product.id },
          });

          if (!existingProduct) {
            throw new Error(`Product with ID ${product.id} not found`);
          }

          let sizesStock: any = existingProduct && existingProduct.sizes?.reduce((accum: number, value: any) => {
            if (value.stock) {
              return accum += Number(value.stock)
            }
            return 0;
          }, 0)
          let colorsStock = existingProduct && existingProduct.filter?.reduce((parentAccume: number, parentvalue: any) => {
            const countedStock = parentvalue.additionalInformation.reduce((accum: number, value: any) => {

              if (value.stock) {
                return accum + Number(value.stock);
              }
              return accum;
            }, 0);
            return parentAccume + countedStock;
          }, 0);

          const totalStock = sizesStock && sizesStock > 0 ? sizesStock : colorsStock && colorsStock > 0 ? colorsStock : product?.stock || 0;

          if (totalStock < product.quantity) {
            throw new Error(
              `Not enough stock for product with ID ${product.id}. Available stock: ${existingProduct.stock}`,
            );
          }
        }

        // const existingSalesRecord = await prisma.sales_record.findUnique({
        //   where: { user_email: data.user_email },
        //   include: { products: true },
        // });

        // let newSalesRecord: any;

        // if (existingSalesRecord) {
        //   newSalesRecord = await prisma.sales_record.update({
        //     where: { user_email: data.user_email },
        //     data: {
        //       products: {
        //         create: data.orderedProductDetails.map((product) => ({
        //           quantity: product.quantity,
        //           productData: product,
        //           orderId: String(result.intention_order_id)
        //         })),
        //       },
        //     },
        //     include: { products: true },
        //   });

        // }
        console.log("============ DATA after order =============", data)
        let newSalesRecord = await prisma.sales_record.create({
          data: {
            firstName: data.first_name,
            lastName: data.last_name,
            user_email: data.user_email,
            products: {
              create: data.orderedProductDetails.map((product) => ({
                quantity: product.quantity,
                productData: product,
                orderId: String(result.intention_order_id),
              })),
            },
            orderId: String(result.intention_order_id),
            address: `${data.address}, ${data.city}, ${data.country}`,
            phoneNumber: data.phone_number && data.phone_number.toString(),
            paymentStatus: {
              checkoutDate: new Date(),
              checkoutStatus: true,
              paymentStatus: false,
            },
            orderNote: data.note,
          },
          include: { products: true },
        });

        return newSalesRecord;
      });

      console.log(result, 'result');
      return { message: 'Order has been created successfully', result: result };
    } catch (error: unknown) {
      console.log(error, 'error');
      if (error instanceof Error) {
        customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
      } else {
        customHttpException(
          'An unknown error occurred',
          'INTERNAL_SERVER_ERROR',
        );
      }
    }
  }

  async get_total_sales() {
    try {
      let sales = await this.prisma.sales_record_products.findMany();
      if (!sales) customHttpException('No Sales found', 'NOT_FOUND');

      let Total_sales = sales.reduce(function (
        accumulator: any,
        currentValue: any,
      ) {
        return accumulator + Number(currentValue.quantity);
      }, 0);

      let total_revenue = sales.reduce(
        (accumulator: any, currentValue: any) => {
          let price =
            currentValue.productData.discountPrice ||
              Number(currentValue.productData.discountPrice) > 0
              ? currentValue.productData.discountPrice
              : currentValue.productData.price;

          let finalPrice = Number(currentValue.quantity) * Number(price);

          return accumulator + finalPrice;
        },
        0,
      );

      return { Total_sales, total_revenue };
    } catch (error: any) {
      console.log(error, 'errr');
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async get_all_records() {
    try {
      let total_products = await this.prisma.products.count({});
      let total_categories = await this.prisma.categories.count({});
      let total_sub_categories = await this.prisma.subCategories.count({});
      let total_user = await this.prisma.user.count({});
      let total_Admins = await this.prisma.admins.count({});
      let sales = await this.prisma.sales_record.findMany({
        include: { products: true },
      });

      const reducer_handler = (arr: any[]) => {
        return arr.reduce((totalQuantity: number, currentValue: any) => {
          const productQuantitySum = currentValue.products.reduce(
            (productTotal: number, value: any) => {
              console.log(value, 'valued');
              return productTotal + value.productData.quantity;
            },
            0,
          );
          return totalQuantity + productQuantitySum;
        }, 0);
      };

      let sucessfulpayment = sales.filter(
        (prod: any) => prod.paymentStatus.paymentStatus,
      );

      let Total_sales = reducer_handler(sucessfulpayment);
      let abdundant = sales.filter(
        (prod: any) => prod.paymentStatus.checkoutStatus,
      );
      let Total_abandant_order = reducer_handler(abdundant);
      console.log(Total_abandant_order, 'Total_abandant_order');

      let total_revenue = sucessfulpayment.reduce(
        (accumulator: any, currentValue: any) => {
          return currentValue.products.reduce((accum: number, value: any) => {
            let price =
              value.productData.discountPrice &&
                Number(value.productData.discountPrice) > 0
                ? value.productData.discountPrice
                : value.productData.price;
            let finalPrice = Number(value.productData.quantity) * Number(price);
            return (accum += finalPrice);
          }, 0);
        },
        0,
      );

      return {
        total_sub_categories,
        totalProducts: total_products,
        totalCategories: total_categories,
        totalAdmins: total_Admins,
        totalRevenue: total_revenue,
        totalSales: Total_sales,
        totalUsers: total_user,
        Total_abandant_order,
      };
    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async getMonthlySales() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const sales = await this.prisma.sales_record_products.findMany({
      where: {
        createdAt: {
          gte: new Date(currentYear, 0, 1),
          lt: new Date(currentYear, currentMonth + 1, 1),
        },
      },
    });

    const monthlyData = sales.reduce(
      (acc, product: any) => {
        const saleDate = new Date(product.createdAt);
        const year = saleDate.getFullYear();
        const month = saleDate.getMonth();
        const key = `${year}-${month}`;
        if (!acc[key]) {
          acc[key] = {
            year,
            month,
            totalRevenue: 0,
            totalProductCount: 0,
          };
        }

        const revenue = Number(
          product.productData.discountPrice ?? product.productData.price,
        );
        const totalRevenue = revenue * Number(product.quantity);

        console.log(
          typeof revenue,
          'revmew',
          'totalRevenue',
          totalRevenue,
          revenue,
        );

        acc[key].totalRevenue += totalRevenue;
        acc[key].totalProductCount += Number(product.quantity);

        return acc;
      },
      {} as Record<
        string,
        {
          year: number;
          month: number;
          totalRevenue: number;
          totalProductCount: number;
        }
      >,
    );

    const result = Object.values(monthlyData).map((data) => ({
      year: data.year,
      month: data.month + 1,
      totalRevenue: data.totalRevenue,
      totalProductCount: data.totalProductCount,
    }));

    result.sort((a, b) => a.year - b.year || a.month - b.month);

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const completeMonthlyData = Array.from(
      { length: currentMonth + 1 },
      (_, index) => ({
        month: `${monthNames[index]} ${currentYear}`,
        Revenue: 0,
        Sales: 0,
      }),
    );

    console.log(completeMonthlyData, 'completeMonthlyData');

    result.forEach((sale) => {
      const monthIndex = sale.month - 1;
      completeMonthlyData[monthIndex] = {
        month: `${monthNames[monthIndex]} ${sale.year}`,
        Revenue: sale.totalRevenue,
        Sales: sale.totalProductCount,
      };
    });

    return completeMonthlyData;
  }

  async getWeeklySales_record() {
    try {
      const today = new Date();
      const startOfToday = new Date();
      const PreviousWeek = new Date(today);
      PreviousWeek.setDate(today.getDate() - 7);

      const sales = await this.prisma.sales_record_products.findMany({
        where: {
          createdAt: {
            gte: PreviousWeek,
            lt: startOfToday,
          },
        },
      });

      const salesData = sales.reduce(
        (acc: Record<string, any>, product: any) => {
          let date = new Date(product.createdAt);
          let day = date.getDay();
          let sales_date = date.getDate();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;

          const key = `${day}-${sales_date}-${month}-${year}`;

          if (!acc[key]) {
            acc[key] = {
              day,
              sales_date,
              month,
              year,
              revenue: 0,
              total_sold_product: 0,
            };
          }

          const price = Number(
            product.productData.discountPrice ?? product.productData.price,
          );

          let revenue = Number(product.quantity) * price;
          acc[key].revenue += revenue;
          acc[key].total_sold_product += Number(product.quantity);

          return acc;
        },
        {},
      );

      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      // Initialize the array for the week
      const completeWeeklyData = days.map((day, index) => ({
        day,
        revenue: 0,
        total_sold_product: 0,
      }));

      // Populate the data based on `salesData`
      Object.values(salesData).forEach((item: any) => {
        completeWeeklyData[item.day].revenue += item.revenue;
        completeWeeklyData[item.day].total_sold_product +=
          item.total_sold_product;
      });

      console.log('completeWeeklyData', completeWeeklyData);
      return completeWeeklyData;
    } catch (error) {
      console.log(error, 'err');
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
    }
  }

  async order_history(req: Request | any) {
    try {
      const { email } = req.user;
      console.log(email, 'email');
      if (!email) return 'Email not found , Please login and then try';
      const sales = await this.prisma.sales_record.findMany({
        where: { user_email: { contains: email } },
        include: { products: true },
      });
      return sales;
    } catch (error) {
      console.log(error, 'err');
      customHttpException(
        error.meta?.cause || error.message,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async updatePaymentStatus(data: updatePaymentStatusDto) {
    try {
      const { orderId, paymentStatus } = data;
      const salesRecord: any = await this.prisma.sales_record.findUnique({
        where: { orderId },
      });
      console.log(data);

      if (!salesRecord) {
        customHttpException('Order not found', 'NOT_FOUND');
      }

      // if (salesRecord.paymentStatus.paymentStatus) {
      //   console.log(salesRecord.paymentStatus.paymentStatus, 'paymentStatus');
      //   customHttpException('Payment status already updated!', 'BAD_REQUEST');
      // }

      const updatedSalesRecord = await this.prisma.sales_record.update({
        where: { orderId },
        data: {
          paymentStatus: {
            paymentStatus: paymentStatus,
            paymentDate: new Date(),
            checkout: false,
            success: true,
          },
        },
      });




      // // console.log(salesRecord, 'salesRecord');
      // const salesRecordId = Number(salesRecord.id);

      // const salesRecordProduct: any = await this.prisma.sales_record_products.findFirst({
      //   where: { salesRecordId },
      // });
      // // console.log(salesRecordProduct, 'salesRecordProduct');


      // const existingProduct: any = await this.prisma.products.findFirst({
      //   where: { id: salesRecordProduct.productData.id },
      // });

      // // console.log(existingProduct, 'existingProduct');

      // const selectedSize = salesRecordProduct.productData.selectedSize?.name;
      // const selectedFilter = salesRecordProduct.productData.selectedfilter?.name;

      // const quantitySold = salesRecordProduct.quantity;

      // if (existingProduct) {
      //   let isUpdated = false;
      //   const filterCategory = existingProduct.filter.find((item: any) => item.heading === 'Color');

      //   console.log('debug 2:', filterCategory);
      //   if (filterCategory && filterCategory.additionalInformation) {
      //     const filterVariant = filterCategory.additionalInformation.find((item: any) => item.name === selectedFilter);

      //     console.log('debug 1:', filterVariant);

      //     if (filterVariant) {
      //       const filterStock = filterVariant.stock;

      //       if (filterStock >= quantitySold) {
      //         const updatedFilterStock = filterStock - quantitySold;

      //         await this.prisma.products.update({
      //           where: { id: existingProduct.id },
      //           data: {
      //             filter: {
      //               //@ts-expect-error
      //               update: {
      //                 where: { color: selectedFilter },
      //                 data: { stock: updatedFilterStock },
      //               },
      //             },
      //           },
      //         });

      //         console.log(`Stock for filter ${selectedFilter} updated to: ${updatedFilterStock}`);
      //         isUpdated = true;
      //       } else {
      //         console.log(`Not enough stock for filter ${selectedFilter}. Deducting from total stock.`);
      //       }
      //     }
      //   }

      //   if (!isUpdated && selectedSize && existingProduct.sizes) {
      //     const sizeVariant = existingProduct.sizes.find((item: any) => item.size === selectedSize);

      //     if (sizeVariant) {
      //       const sizeStock = sizeVariant.stock;

      //       if (sizeStock >= quantitySold) {
      //         const updatedSizeStock = sizeStock - quantitySold;

      //         await this.prisma.products.update({
      //           where: { id: existingProduct.id },
      //           data: {
      //             sizes: {

      //               //@ts-expect-error
      //               update: {
      //                 where: { size: selectedSize },
      //                 data: { stock: updatedSizeStock },
      //               },
      //             },
      //           },
      //         });

      //         console.log(`Stock for size ${selectedSize} updated to: ${updatedSizeStock}`);
      //         isUpdated = true;
      //       } else {
      //         console.log(`Not enough stock for size ${selectedSize}. Deducting from total stock.`);
      //       }
      //     }
      //   }

      //   if (!isUpdated) {
      //     const updatedTotalStock = existingProduct.stock - quantitySold;

      //     if (updatedTotalStock >= 0) {
      //       await this.prisma.products.update({
      //         where: { id: existingProduct.id },
      //         data: {
      //           stock: updatedTotalStock,
      //         },
      //       });

      //       console.log(`Stock deducted from total stock. Updated total stock to: ${updatedTotalStock}`);
      //     } else {
      //       console.log('Not enough stock available to complete the order.');
      //     }
      //   }
      // } else {
      //   console.log(`Product with ID ${salesRecordProduct.productData.id} not found.`);
      // }

      const { user_email, address, phoneNumber, createdAt } = await this.prisma.sales_record.findFirst({ where: { orderId } });
      const productData = await this.prisma.sales_record_products.findMany({ where: { orderId } });
      const purchaseDate = formatDate(createdAt);
      await this.sendOrderConfirmationEmail(user_email, phoneNumber, address, productData, null, orderId, purchaseDate);
      await this.sendOrderConfirmationEmail(
        null, phoneNumber, address, productData, null, orderId, purchaseDate
      );




      return { message: 'Payment status updated successfuly🎉', orderId };
    } catch (error: unknown) {
      console.log(error, 'error');
      if (error instanceof Error) {
        customHttpException(error.message, 'INTERNAL_SERVER_ERROR');
      } else {
        customHttpException(
          'An unknown error occurred',
          'INTERNAL_SERVER_ERROR',
        );
      }
    }
  }


  async track_order(id: string) {
    try {
      let sales_record = await this.prisma.sales_record.findFirst({
        where: { orderId: id },
        include: { products: true },
      });
      return sales_record;
    } catch (error) {
      customHttpException(
        error.message || 'An unknown error occurred',
        error.status || 'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async Get_orders() {
    try {
      let sales = await this.prisma.sales_record.findMany({
        include: { products: true },
      });
      return sales;
    } catch (error) {
      customHttpException(
        error.message || 'An unknown error occurred',
        error.status || 'INTERNAL_SERVER_ERROR',
      );
    }
  }

  apiTester() {
    return 'api is working';
  }

  private async sendOrderConfirmationEmail(
    email: string,
    phone: string,
    address: string,
    productDetails: any,
    shipmentFee: number,
    orderId: string,
    purchaseDate: string,
  ) {

    let TotalProductsPrice = 0;
    await productDetails.forEach(({ productData }: any) => {
      TotalProductsPrice = productData.discountPrice ? TotalProductsPrice + productData.discountPrice : TotalProductsPrice + productData.price;
    })

    try {

      const recipients = `mujtaba.shafique01@gmail.com`
      // const recipients = email
      //   ? `${email}`
      //   : `${process.env.RECEIVER_MAIL1}, ${process.env.RECEIVER_MAIL2}`;
      const mailOptions = {
        from: `"The Team @ Avenue39" <${process.env.MAILER_MAIL}>`,
        to: recipients,
        subject: 'Order Confirmation - avenue39.com',
        html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 700px;
            margin: 20px auto;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-top: 5px solid #AFA183;
            border-bottom: 5px solid #AFA183;
        }

        .main-container {
        font-size:14px;
            padding: 20px;
        }

        .header {
            text-align: center;
            padding: 20px 0;
        }

        .header img {
            max-width: 250px;
        }

        .status {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px 0;
        }

        .status div {
            padding: 10px 20px;
            border-radius: 20px;
            margin: 0 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            font-weight: bold;
        }

        .confirmed {
            background-color: #000000;
            color: #fff;
        }

        .shipping,
        .received {
            background-color: #ddd;
            color: #333;
        }

        .order-button {
            display: block;
            width: 200px;
            text-align: center;
            background-color: #AFA183;
            color: white;
            padding: 10px;
            margin: 20px auto;
            text-decoration: none;
            border-radius: 1px;
        }

        .purchase-details {
            background-color: #F6F6F6;
            padding: 15px;
            margin-top: 20px;
           
        }

        .purchase-table {
            width: 100%;
            border-collapse: collapse;
             text-align: center;
        }

        .purchase-table th,
        .purchase-table td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        .footer {
            background-color: #AFA183;
            color: white;
            text-align: center;
            padding: 15px 0;
            margin-top: 20px;
        }

        .social-icons {
            text-align: center;
            margin-top: 10px;
        }

        .social-icons a {
            margin: 0 10px;
            text-decoration: none;
            font-size: 18px;
            color: #333;
        }

        .features {
            background-color: #ff6600;
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-around;
        }

        .feature {
            text-align: center;
        }

        .feature img {
            width: 40px;
            height: 40px;
        }

        .categories {
            padding: 15px;
            border-top: 2px solid #ccc;
        }

        .categories span {
            margin: 0 10px;
            font-weight: bold;
        }

        .social-icons {
            padding: 15px;
        }

        .social-icons a {
            margin: 0 10px;
            text-decoration: none;
            font-size: 20px;
            color: black;
        }

        .features {
            background-color: #ff6600;
            color: white;
            width: 100%;
            align-items: center;
            padding:30px;
        }

        .feature {
            text-align: center;
        }

        .feature img {
            width: 30px;
            height: auto;
        }

        .categories {
            margin-top: 10px;
            padding: 15px;
            border-top: 2px solid #ccc;
            border-bottom: 2px solid #ccc;
        }

        .categories span {
            margin: 0 10px;
            font-size: 14px;
            font-weight: 100;
        }

        .social-icons {
            padding: 15px;
        }

        .social-icons a {
            margin: 0 10px;
            text-decoration: none;
            font-size: 20px;
            color: black;
        }

        .progress-container {
            align-items: center;
            justify-content: center;
            margin-top: 50px;
            margin-bottom: 30px;
           
            width: 100%;
            
        }

        .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }

        .step:not(:last-child)::after {
            content: "";
            position: absolute;
            width: 80px;
            height: 2px;
            background-color: black;
            top: 25px;
            left: 100%;
            transform: translateX(-40%);
        }

        .icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            border: 2px solid black;
            font-size: 24px;
        }

        .completed .icon {
            background-color: #000000;
            color: white;
            border: none;
        }

        .step p {
            margin-top: 8px;
            font-size: 14px;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="main-container">
            <div class="header" style="text-align:center;">
                <img src="https://res.cloudinary.com/dgwsc8f0g/image/upload/v1739340257/rztttx6wr9shaqkrgoqe.png"
                    alt="Brand Logo">
            </div>
            <h3 style="text-align:center; margin:0; padding:0">ORDER#${orderId}</h3>
            <p style="text-align:center;margin:0;padding:0">${purchaseDate}</p>
            <h1 style="text-align:center;">Order Confirmed</h1>

            <div class="progress-container" style="text-align:center;">
                <img src="https://res.cloudinary.com/dgwsc8f0g/image/upload/v1739343204/Group_1000004286_1_f4espe.png" alt="Progress Status">
            </div>
            <p style="text-align:center;">Dear <b>Customer,</b></p>
            <p style="text-align:center;font-size:14px">Thank you very much for the order <br> you placed with <a
                    href="https://avenue39.com/">www.avenue39.com</a></p>

            <a href="#" class="order-button">View Your Order</a>
            <p style="text-align:center;">Your order has now been sent to the warehouse to prepare for packing and
                dispatch.</p>
            <p style="text-align:center;">Our team will be in touch soon to arrange the delivery with you.</p>
            <p style="text-align:center;">All The Best,</p>
            <p style="text-align:center;">The Team at<strong>"Avenue39"</strong></p>
            <div class="purchase-details">
               <h2 style="border-bottom: 2px solid #ccc; padding-bottom:15px"}>Purchase Details</h2>
            <table class="purchase-table" style="width: 100%; border-collapse: collapse;">
    <thead>
      
    </thead>
   <tbody>
  ${productDetails.map(({ productData }) => `
    <tr style="border: none;">
      <td style="padding: 10px; border: none;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse;">
          <tr style="border: none;">
            <td align="center" valign="middle" style="padding: 10px; border: none;">
              <img src="${productData.posterImageUrl}" alt="${productData.name}" 
                   style="height: 100px; width: 100px; border-radius: 5px; display: block;">
            </td>
            <td valign="middle" style="border: none;">
              <p style="margin: 0; font-weight: bold;">${productData.name}</p>
              ${productData.selectedfilter ? `<p style="margin: 0; font-size: 14px; color: gray;">Selected Filter: ${productData.selectedfilter.name}</p>` : ''}
              ${productData.selectedSize ? `<p style="margin: 0; font-size: 14px; color: gray;">Selected Size: ${productData.selectedSize.name}</p>` : ''}
            </td>
          </tr>
        </table>
      </td>
      <td style="padding: 10px; text-align: center; border: none;">QTY: ${productData.selectedSize ? productData.selectedSize.stock : productData.quantity}</td>
      <td style="padding: 10px; text-align: center; font-weight: bold; border: none;">${productData.price}</td>
    </tr>
  `).join('')}
</tbody>

</table>


                                <body style="font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 0;">
<table style="width: 100%; border-collapse: collapse; text-align: left; margin: auto;">
    <tr>
        <td style="width: 60%; vertical-align: top; padding: 10px; border-right: 2px solid #ccc;">
            <table style="width: 100%; border-collapse: collapse;">
               ${email ? ` <tr>
                    <th style="padding: 8px; text-align: left;">Customer Email:</th>
                    <td style="padding: 8px; padding-left:0px">${email}</td>
                </tr> ` : ''}
                <tr>
                    <th style="padding: 8px; text-align: left;">Customer Phone:</th>
                    <td style="padding: 8px; padding-left:0px">${phone}</td>
                </tr>
                <tr>
                    <th style="padding: 8px; text-align: left;">Customer Address:</th>
                    <td style="padding: 8px; padding-left:0px">${address}</td>
                </tr>
            </table>
        </td>

        <td style="width: 40%;  padding: 10px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr >
                    <td colspan="5" style="padding: 8px; ">Subtotal</td>
                    <td style="padding: 8px;">${TotalProductsPrice}</td>
                </tr>
                <tr style="border-bottom: 2px solid #ccc;">
                    <td colspan="5" style="padding: 8px; ">Shipment</td>
                    <td style="padding: 8px;">${TotalProductsPrice > 1000 ? "Free" : 20}</td>
                </tr>
                <tr>
                    <td colspan="5" style="padding: 8px; font-weight: bold;">Total</td>
                    <td style="padding: 8px; font-weight: bold;">${TotalProductsPrice > 250 ? TotalProductsPrice : 20 + TotalProductsPrice}</td>
                </tr>
            </table>
        </td>
    </tr>
</table>

    </div>
    
    <div style="text-align: center; margin-top: 20px; background-color: #AFA183; padding: 14px;">
        <img src="https://res.cloudinary.com/dgwsc8f0g/image/upload/v1739185483/features_lbnmr6.png" alt="features" style="display: block; margin: auto; max-width: 100%; height: auto;">
    </div>
</body>
        <div class="categories">
            <span>Dinning</span>
            <span>Living</span>
            <span>Bedroom</span>
            <span>Chairs</span>
            <span>Tables</span>
            <span>Home Office</span>
            <span>Lighting</span>
            <span>Accessories</span>
        </div>
        <div class="social-icons">
            <a href="https://www.facebook.com/avenue39home"> <img src="https://res.cloudinary.com/dgwsc8f0g/image/upload/v1739185482/facebook-icon_tdqcrw.png"></a>
            <a href="https://www.pinterest.com/avenue39home/"> <img src="https://res.cloudinary.com/dgwsc8f0g/image/upload/v1739185483/pinterest-icon_dsvge7.png" alt="pinterest"></a>
        </div>
    </div>
</body>

</html>`,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
