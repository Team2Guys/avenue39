import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto, createAdminDto, editAdminDto } from './dto/admin.dto';

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
  @Post('/edit-admin')
  editAdmin(@Body() updateUserDto: editAdminDto) {
    return this.adminService.editAdmin(updateUserDto);
  }

  @Delete('delete-admin')
  async removeAdmin(@Headers('adminId') adminId: string) {
    const id = parseInt(adminId, 10);

    if (isNaN(id)) {
      return { message: 'Invalid product ID', status: HttpStatus.BAD_REQUEST };
    }

    return this.adminService.removeAdmin(id);
  }
  @Get('getAdminHandler')
  async adminHandler(@Headers('authorization') authToken: string) {
    return this.adminService.adminHandler(authToken);
  }
  @Get('getSuperAdminHandler')
  async superAdminHandler(@Headers('authorization') authToken: string) {
    return this.adminService.superAdminHandler(authToken);
  }
}
