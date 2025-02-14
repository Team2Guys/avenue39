import {
  HttpException,
  HttpStatus,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from '../users/dto/user.dto';
import { encryptPassword, hashPassword, verifyPassword } from '../utils/func';
import * as jwt from 'jsonwebtoken';
import { customHttpException } from '../utils/helper';
import { AdminLoginDto, createAdminDto, editAdminDto } from './dto/admin.dto';
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

      return admins;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async adminLogin(loginData: AdminLoginDto, res) {
    const { email, password } = loginData;
    try {
      const existingUser = await this.prisma.admins.findFirst({
        where: { email },
      });
      if (!existingUser) {
        return customHttpException('No User found😴', 'FORBIDDEN');
      }

      if (existingUser.role !== 'Admin') {
        return customHttpException('No User found😴', 'FORBIDDEN');
      }

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
      res.cookie('2guysAdminToken', token, {
        // httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        SameSite: 'Lax',
      });

      return {
        message: 'Login successfull 🎉',
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async superAdminLogin(loginData: AdminLoginDto, res) {
    const { email, password } = loginData;
    try {
      const existingUser = await this.prisma.admins.findFirst({
        where: { email },
      });

      if (!existingUser)
        return customHttpException('User Not found', 'NOT_FOUND');

      if (existingUser.role !== 'Super-Admin')
        return customHttpException(
          'Super Admin credentials is correct😴',
          'FORBIDDEN',
        );

      if (existingUser) {
        const isPasswordValid = await verifyPassword(
          password,
          existingUser.password,
          this.configService,
        );

        if (!isPasswordValid)
          throw new UnauthorizedException('Invalid username or password');

        const token = jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
          expiresIn: '24h',
        });
        const { password: _, ...userWithoutPassword } = existingUser;

        res.cookie('superAdminToken', token, {
          // httpOnly: true,
          // secure: process.env.NODE_ENV === 'production',
          maxAge: 24 * 60 * 60 * 1000,
        });

        return {
          message: 'Login successfull 🎉',
          user: userWithoutPassword,
          token,
        };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async adminSignup(signupUserDto: createAdminDto) {
    console.log('Admin Created triggered!!');
    console.log(signupUserDto);
    try {
      const { email, password } = signupUserDto;

      const existingUser = await this.prisma.admins.findFirst({
        where: { email },
      });

      if (existingUser) return customHttpException('Already user exists😴', 'CONFLICT');

      const hashedPassword = await hashPassword(password, this.configService);
      
      const user = await this.prisma.admins.create({
        data: {
          ...signupUserDto,
          password: hashedPassword,
        },
      });

      const { password: newpassword, ...userWithoutPassword } = user;
      return {
        message: 'Congrats🎉 admin created successfully',
        user: userWithoutPassword,
        status: HttpStatus.OK,
      };
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }

  async editAdmin(updateUserDto: editAdminDto) {
    try {
      const { id, password, ...withOutPassword } = updateUserDto;
      const existingUser = await this.prisma.admins.findFirst({
        where: { id },
      });
      const Newpassword = password
        ? await hashPassword(password, this.configService)
        : existingUser.password;

      if (!existingUser) {
        return {
          message: 'Admin does not exist with this ID',
          status: HttpStatus.BAD_REQUEST,
        };
      } else {
        const updatedUser = await this.prisma.admins.update({
          where: { id },
          data: {
            ...withOutPassword,
            password: Newpassword,
          },
        });

        const { password, ...userWithoutPassword } = updatedUser;

        return {
          message: 'Admin details updated successfully',
          user: userWithoutPassword,
          status: HttpStatus.OK,
        };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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

  async adminHandler(authToken: string) {
    try {
      if (!authToken) {
        throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
      }

      const token = authToken.startsWith('Bearer ')
        ? authToken.substring(7)
        : authToken;
      // console.log(authToken);
      // console.log(token);
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as {
        email: string;
      };
      const email = decoded.email;

      if (!email) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }

      const existingUser = await this.prisma.admins.findFirst({
        where: { email },
      });
      const { password: _, ...userWithoutPassword } = existingUser;
      return {
        message: 'Admin details are here 🎉',
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
  async superAdminHandler(authToken: string) {
    try {
      if (!authToken) {
        throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
      }

      const token = authToken.startsWith('Bearer ')
        ? authToken.substring(7)
        : authToken;
      // console.log(authToken);
      // console.log(token);
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as {
        email: string;
      };
      const email = decoded.email;

      if (!email) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }

      const existingUser = await this.prisma.admins.findFirst({
        where: { email },
      });
      const { password: _, ...userWithoutPassword } = existingUser;
      return {
        message: 'Super Admin details are here 🎉',
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
