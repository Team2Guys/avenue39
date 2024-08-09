import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto, createAdminDto } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('/get-all')
  getAdmins() {
    return this.adminService.getAdmins();
  }
  @Post('/login')
  adminLogin(
    @Body() loginData: AdminLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.adminLogin(loginData, res);
  }
  @Post('/superadmin-login')
  superAdminLogin(
    @Body() loginData: AdminLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.superAdminLogin(loginData, res);
  }
  @Post('/create-admin')
  adminSignup(@Body() signupUserDto: createAdminDto) {
    return this.adminService.adminSignup(signupUserDto);
  }
  // @Delete(':id')
  // removeAdmin(@Param('id') id: string) {
  //   return this.adminService.removeAdmin(+id);
  // }
  @Delete('delete-admin')
  async removeAdmin(@Query('adminId') adminId: string) {
    const id = parseInt(adminId, 10);

    if (isNaN(id)) {
      return { message: 'Invalid product ID', status: HttpStatus.BAD_REQUEST };
    }

    return this.adminService.removeAdmin(id);
  }
}
