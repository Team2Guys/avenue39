import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let token = req.headers['token']
   
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req['user'] = decoded;
      next();
    } catch (err) {
      console.log(err, "err")
      throw new UnauthorizedException('Invalid token');
    };
  }
}