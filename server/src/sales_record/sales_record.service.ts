import { Injectable } from '@nestjs/common';
import { CreateSalesRecordDto } from './dto/create-sales_record.dto';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';


@Injectable()
export class SalesRecordService {
  constructor(private prisma: PrismaService) { }

  async Add_sales_record(data: CreateSalesRecordDto) {
    try {
      console.log(data, "data");

      const transaction = await this.prisma.$transaction(async (prisma) => {
        for (const product of data.products) {
          const existingProduct = await prisma.products.findUnique({
            where: { id: product.id },
          });

          if (!existingProduct) {
            throw new Error(`Product with ID ${product.id} not found`);
          }

          if (existingProduct.stock < product.quantity) {
            throw new Error(
              `Not enough stock for product with ID ${product.id}. Available stock: ${existingProduct.stock}`
            );
          }

          await prisma.products.update({
            where: { id: product.id },
            data: {
              stock: existingProduct.stock - product.quantity,
            },
          });
        }

        const existingSalesRecord = await prisma.sales_record.findUnique({
          where: { user_email: data.user_email },
          include: { products: true },
        });

        let newSalesRecord;

        if (existingSalesRecord) {
          newSalesRecord = await prisma.sales_record.update({
            where: { user_email: data.user_email },
            data: {
              products: {
                create: data.products.map((product) => ({
                  quantity: product.quantity,
                  productData: product,
                })),
              },
            },
            include: { products: true },
          });
        } else {
          newSalesRecord = await prisma.sales_record.create({
            data: {
              user_email: data.user_email,
              products: {
                create: data.products.map((product) => ({
                  quantity: product.quantity,
                  productData: product,
                })),
              },
            },
            include: { products: true },
          });
        }

        return newSalesRecord;
      });

      return transaction;
    } catch (error: unknown) {
      if (error instanceof Error) {
        customHttpException(error.message, "INTERNAL_SERVER_ERROR");
      } else {
        customHttpException("An unknown error occurred", "INTERNAL_SERVER_ERROR");
      }
    }
  }

  async get_total_sales() {
    try {
      let sales = await this.prisma.sales_record_products.findMany()
      if (!sales) customHttpException("No Sales found", 'NOT_FOUND')


      let Total_sales = sales.reduce(function (accumulator: any, currentValue: any) {
        return accumulator + Number(currentValue.quantity);
      }, 0);

      let total_revenue = sales.reduce((accumulator: any, currentValue: any) => {
        let price = (currentValue.productData.discountPrice || Number(currentValue.productData.discountPrice) > 0) ? currentValue.productData.discountPrice : currentValue.productData.price

        let finalPrice = Number(currentValue.quantity) * Number(price)

        return accumulator + finalPrice
      }, 0)
      return { Total_sales, total_revenue }

    } catch (error: any) {
      console.log(error, "errr")
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR')
    }

  }


  async get_all_records() {
    try {
      let total_products = await this.prisma.products.count({})
      let total_categories = await this.prisma.categories.count({})
      let total_sub_categories = await this.prisma.subCategories.count({})
      let total_user = await this.prisma.user.count({})
      let total_Admins = await this.prisma.admins.count({})
      let sales = await this.prisma.sales_record_products.findMany()

      let Total_sales = sales.reduce(function (accumulator: any, currentValue: any) {
        return accumulator + Number(currentValue.quantity);
      }, 0);

      let total_revenue = sales.reduce((accumulator: any, currentValue: any) => {
        let price = (currentValue.productData.discountPrice || Number(currentValue.productData.discountPrice) > 0) ? currentValue.productData.discountPrice : currentValue.productData.price

        let finalPrice = Number(currentValue.quantity) * Number(price)

        return accumulator + finalPrice
      }, 0)

      return {
        total_sub_categories,
        totalProducts: total_products,
        totalCategories: total_categories,
        totalAdmins: total_Admins,
        totalRevenue: total_revenue,
        totalSales: Total_sales,
        totalUsers:total_user
      }

    } catch (error) {
      customHttpException(error.message, 'INTERNAL_SERVER_ERROR')

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

    const monthlyData = sales.reduce((acc, product: any) => {
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

      const revenue = Number(product.productData.discountPrice ?? product.productData.price)
      const totalRevenue = revenue * Number(product.quantity)

      console.log(typeof (revenue), "revmew", "totalRevenue", totalRevenue, revenue)


      acc[key].totalRevenue += totalRevenue
      acc[key].totalProductCount += Number(product.quantity)

      return acc;
    }, {} as Record<string, { year: number; month: number; totalRevenue: number; totalProductCount: number }>);


    const result = Object.values(monthlyData).map(data => ({
      year: data.year,
      month: data.month + 1,
      totalRevenue: data.totalRevenue,
      totalProductCount: data.totalProductCount,
    }));


    result.sort((a, b) => a.year - b.year || a.month - b.month);

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const completeMonthlyData = Array.from({ length: currentMonth + 1 }, (_, index) => ({
      month: `${monthNames[index]} ${currentYear}`,
      Revenue: 0,
      Sales: 0
    }));

    console.log(completeMonthlyData, "completeMonthlyData")

    result.forEach(sale => {
      const monthIndex = sale.month - 1;
      completeMonthlyData[monthIndex] = {
        month: `${monthNames[monthIndex]} ${sale.year}`,
        Revenue: sale.totalRevenue,
        Sales: sale.totalProductCount,
      };
    });

    return completeMonthlyData;
  };


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
            product.productData.discountPrice ?? product.productData.price
          );

          let revenue = Number(product.quantity) * price;
          acc[key].revenue += revenue;
          acc[key].total_sold_product += Number(product.quantity);

          return acc;
        },
        {}
      );

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      // Initialize the array for the week
      const completeWeeklyData = days.map((day, index) => ({
        day,
        revenue: 0,
        total_sold_product: 0,
      }));

      // Populate the data based on `salesData`
      Object.values(salesData).forEach((item: any) => {
        completeWeeklyData[item.day].revenue += item.revenue;
        completeWeeklyData[item.day].total_sold_product += item.total_sold_product;
      });

      console.log("completeWeeklyData", completeWeeklyData);
      return completeWeeklyData;
    } catch (error) {
      console.log(error, "err");
      customHttpException(error.message, "INTERNAL_SERVER_ERROR");
    }
  }


  apiTester() {
    return "api is working"
  }

}
