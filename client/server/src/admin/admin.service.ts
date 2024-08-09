import {
  HttpException,
  HttpStatus,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from 'src/users/dto/user.dto';
import { hashPassword, verifyPassword } from 'src/utils/func';
import * as jwt from 'jsonwebtoken';
import { customHttpException } from 'src/utils/helper';
import { createAdminDto } from './dto/admin.dto';
import * as cookieParser from 'cookie-parser';
@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async getAdmins() {
    try {
      const admins = await this.prisma.admins.findMany({});

      const adminsWithoutPassword = admins.map(
        ({ password, ...adminWithoutPassword }) => adminWithoutPassword,
      );

      return adminsWithoutPassword;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async adminLogin(loginData: LoginDto, res) {
    const { email, password } = loginData;
    try {
      const existingUser = await this.prisma.admins.findFirst({
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
        res.cookie('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 24 * 60 * 60 * 1000,
        });

        return {
          message: 'Login successfull 🎉',
          user: userWithoutPassword,
          //   token,
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
  async superAdminLogin(loginData: LoginDto, res) {
    const { email, password } = loginData;
    try {
      const existingUser = await this.prisma.admins.findFirst({
        where: { email },
      });
      if (existingUser.role !== 'Super-Admin') {
        return {
          message: 'Check again super admin credentials😴',
          status: HttpStatus.FORBIDDEN,
        };
      }

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
        res.cookie('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 24 * 60 * 60 * 1000,
        });

        return {
          message: 'Login successfull 🎉',
          user: userWithoutPassword,
          //   token,
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

  async adminSignup(signupUserDto: createAdminDto) {
    try {
      const { email, password } = signupUserDto;
      const existingUser = await this.prisma.admins.findFirst({
        where: { email },
      });
      const hashedPassword = await hashPassword(password, this.configService);
      if (!existingUser) {
        const user = await this.prisma.admins.create({
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

  async removeAdmin(id: number) {
    console.log(id);
    try {
      const existingUser = await this.prisma.admins.findFirst({
        where: { id },
      });

      console.log(existingUser);
      if (existingUser) {
        await this.prisma.admins.delete({
          where: { id: id },
        });

        return {
          message: 'Congrats🎉 Admin Deleted successfully',
          status: HttpStatus.OK,
        };
      } else {
        return {
          message: 'Admin not found 😴',
          status: HttpStatus.CONFLICT,
        };
      }
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }
}
