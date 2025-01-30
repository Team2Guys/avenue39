import {
  Injectable,
  HttpStatus,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';

import {
  ForgetPasswordDto,
  LoginDto,
  SignupDto,
  UpdateUserDto,
} from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException, sendResetEmail } from '../utils/helper';
import { hashPassword, verifyPassword } from '..//utils/func';
import * as jwt from 'jsonwebtoken';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async signup(signupUserDto: SignupDto) {
    try {
      const { email, password:newpassword } = signupUserDto;
      const existingUser = await this.prisma.user.findFirst({
        where: { email },
      });
      console.log(newpassword, "new pasword");
      const hashedPassword = await hashPassword(newpassword, this.configService);
      if (!existingUser) {
        const user = await this.prisma.user.create({
          data: {
            ...signupUserDto,
            password: hashedPassword,
          },
        });
        const { password, ...userWithoutPassword } = user;
        return {
          message: 'Congrats🎉 Account created successfully',
          user: userWithoutPassword,
          status: HttpStatus.OK,
        };
      } else {
        return {
          message: 'Already user exists',
          status: HttpStatus.CONFLICT,
        };
      }
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }
  async editUser(updateUserDto: UpdateUserDto) {
    try {
      const { id, ...updatedData } = updateUserDto;

      const existingUser = await this.prisma.user.findFirst({
        where: { id },
      });

      if (!existingUser) {
        return {
          message: 'User does not exist',
          status: HttpStatus.NOT_FOUND,
        };
      }
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updatedData,
      });

      const { password: _, ...userWithoutPassword } = updatedUser;

      return {
        message: 'User updated successfully 🎉',
        user: userWithoutPassword,
        status: HttpStatus.OK,
      };
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }

  
  async login(loginData: LoginDto, res) {
    const { email, password } = loginData;
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: { email },
      });

      if (existingUser) {
        const isPasswordValid = await verifyPassword(password,existingUser.password,this.configService,);
        console.log(isPasswordValid, "valid passowrd")
        if (!isPasswordValid) {
          return {
            message: 'Invalid Password',
            status: HttpStatus.FORBIDDEN,
          };
        }

        const token = jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
          expiresIn: '24h',
        });
        const { password: _, ...userWithoutPassword } = existingUser;
        // res.cookie('user_token', token, {
        //   httpOnly: false,
        //   // secure: process.env.NODE_ENV === 'production',
        //   secure: false, // Set to false for localhost
        //   sameSite: 'none',
        //   maxAge: 24 * 60 * 60 * 1000,
        // });

        return {
          message: 'Login successful',
          user: userWithoutPassword,
          token,
        };
      } else {
        return {
          message: 'User not found',
          status: HttpStatus.FORBIDDEN,
        };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  findAll() {
    return this.prisma.user.findMany({});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // try {
    //   return this.prisma.user.update({
    //     where: { id: id },
    //     data: updateUserDto,
    //   });
    // } catch (error) {
    //   customHttpException(error.message, 'BAD_REQUEST');
    // }
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id: id },
    });
  }

  async forgetPassword(PasswordData: ForgetPasswordDto) {
    try {
      const { email } = PasswordData;
      const userData = await this.prisma.user.findFirst({
        where: { email },
      });
      if (!userData) {
        return {
          message: 'User not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const resetToken = jwt.sign({ email }, process.env.TOKEN_SECRET, {
        expiresIn: '1h',
      });

      await this.prisma.user.update({
        where: { email },
        data: {
          resetToken,
          resetTokenExpiry: new Date(Date.now() + 3600 * 1000),
        },
      });

      await sendResetEmail(email, resetToken);
      return {
        message: 'Password reset link sent to your email',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }





  async userHandler(authToken: string) {
    try {
      if (!authToken) {
        throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
      }

      const token = authToken.startsWith('Bearer ')? authToken.substring(7): authToken;
      console.log(authToken);
      console.log(token, "token");
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as {
        email: string;
      };
      const email = decoded.email;
console.log(email, "decoded")

      if (!email) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }

      const existingUser = await this.prisma.user.findFirst({
        where: { email },
      });
      const { password: _, ...userWithoutPassword } = existingUser;
      return {
        message: 'User details are here 🎉',
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }


  async updatePassword(authToken: string, password: string) {
    try {
      if (!authToken) {
        throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
      }

      const token = authToken.startsWith('Bearer ')? authToken.substring(7): authToken;
      console.log(authToken);
      console.log(token, "token");
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as {
        email: string;
      };
      const email = decoded.email;

console.log(password, "password")
      if (!email || !password) {
        throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
      }
      const hashedPassword = await hashPassword(password, this.configService);

console.log(hashedPassword, "hashedPassword")
      const existingUser = await this.prisma.user.update({
        where: { email },
        data: {password: hashedPassword}
        
      });
      const { password: _, ...userWithoutPassword } = existingUser;
      return {
        message: 'Password has been successfully reseted 🎉',
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }





}
