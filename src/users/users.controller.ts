import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  SignupDto,
  LoginDto,
  UpdateUserDto,
  ForgetPasswordDto,
} from './dto/user.dto';
import { hashPassword } from 'src/utils/func';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/signup')
  create(@Body() signupUserDto: SignupDto) {
    return this.usersService.signup(signupUserDto);
  }
  @Post('/edit-user')
  editUser(@Body() signupUserDto: UpdateUserDto) {
    return this.usersService.editUser(signupUserDto);
  }

  @Post('/login')
  login(
    @Body() loginData: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginData, res);
  }

  @Post('forget-password')
  forget(@Body() PasswordData: ForgetPasswordDto) {
    return this.usersService.forgetPassword(PasswordData);
  }
  @Get('getuserHandler')
  async userHandler(@Headers('authorization') authToken: string) {
    return this.usersService.userHandler(authToken);
  }
  @Post('update_password')
  async update_password(@Headers('authorization') authToken: string, @Body() password: {password: string}) {
    
    return this.usersService.updatePassword(authToken, password.password);
  }
}
