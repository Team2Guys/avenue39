import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

export async function verifyPassword(
  password: string,
  hashedPassword: string,
  configService: ConfigService,
): Promise<boolean> {
  const secret = configService.get<string>(process.env.PASSWORD_SECRET);
  const passwordWithSecret = password + secret;
  return await bcrypt.compare(passwordWithSecret, hashedPassword);
}

export async function hashPassword(
  password: string,
  configService: ConfigService,
): Promise<string> {
  const secret = configService.get<string>(process.env.PASSWORD_SECRET);
  const passwordWithSecret = password + secret;
  const hashedPassword = await bcrypt.hash(passwordWithSecret, 10);
  return hashedPassword;
}
