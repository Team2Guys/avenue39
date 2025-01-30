import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { SalesRecordService } from './sales_record.service';
import {
  CreateSalesRecordDto,
  updatePaymentStatusDto,
} from './dto/create-sales_record.dto';

@Controller('sales-record')
export class SalesRecordController {
  constructor(private readonly salesRecordService: SalesRecordService) {}

  @Post('add_sales')
  create(@Body() createSalesRecordDto: CreateSalesRecordDto) {
    return this.salesRecordService.Add_sales_record(createSalesRecordDto);
  }

  @Get('order_history')
  order_history(@Req() req:Request) {
    return this.salesRecordService.order_history(req);
  }
  @Patch('update-payment-status')
  updatePaymentStatus(@Body() updatePaymentStatusDto: updatePaymentStatusDto) {
    return this.salesRecordService.updatePaymentStatus(updatePaymentStatusDto);
  }

  @Get('get_all_records')
  get_total_records() {
    return this.salesRecordService.get_all_records();
  }

  @Get('getMonthlySales')
  getMonthlySales() {
    return this.salesRecordService.getMonthlySales();
  }

  @Get('getWeeklySales_record')
  getWeeklySales_record() {
    return this.salesRecordService.getWeeklySales_record();
  }
@Get('trackorder/:id')
track_order(@Param("id") id:string){
  return this.salesRecordService.track_order(id)
}

@Get('Get_orders')
Get_orders(){
  return this.salesRecordService.Get_orders()
}

  @Get()
  api_Tester() {
    return this.salesRecordService.apiTester();
  }
}
