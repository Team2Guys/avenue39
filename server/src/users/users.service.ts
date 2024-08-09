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
      const { email, password } = signupUserDto;
      const existingUser = await this.prisma.user.findFirst({
        where: { email },
      });
      const hashedPassword = await hashPassword(password, this.configService);
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

  async login(loginData: LoginDto) {
    //TODO: send token in cookies package 'cookie-parser'
    const { email, password } = loginData;
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: { email },
      });

      if (existingUser) {
        const isPasswordValid = await verifyPassword(
          password,
          existingUser.password,
          this.configService,
        );
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid username or password');
        }

        const token = jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
          expiresIn: '24h',
        });
        const { password: _, ...userWithoutPassword } = existingUser;

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

      // await sendResetEmail(email, resetToken);
      return {
        message: 'Password reset link sent to your email',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
