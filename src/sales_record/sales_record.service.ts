import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateSalesRecordDto,
  updatePaymentStatusDto,
} from './dto/create-sales_record.dto';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';
import { generateUniqueString } from '../utils/func';
import { error } from 'console';

@Injectable()
export class SalesRecordService {
  constructor(private prisma: PrismaService) { }

  async Add_sales_record(data: CreateSalesRecordDto) {
    console.log("===== Data Start ====")
    console.log(data);
    console.log("===== Data End ====")
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
        payment_methods: [55910,52371,52370	 ],
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
          
          let sizesStock:any = existingProduct && existingProduct.sizes?.reduce((accum:number, value: any) => {
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

        let newSalesRecord = await prisma.sales_record.create({
          data: {
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

      if (!salesRecord) {
        customHttpException('Order not found', 'NOT_FOUND');
      }

      if (salesRecord.paymentStatus.paymentStatus) {
        console.log(salesRecord.paymentStatus.paymentStatus, 'paymentStatus');
        customHttpException('Payment status already updated!', 'BAD_REQUEST');
      }

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





      // console.log(updatedSalesRecord, 'updatedSalesRecord');
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
}
