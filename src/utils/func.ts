import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

export async function verifyPassword(password: string,hashedPassword: string,configService: ConfigService,): Promise<boolean> {
  const secret = process.env.PASSWORD_SECRET
  const passwordWithSecret = password;
  console.log(hashedPassword, "hashed")
  return await bcrypt.compare(passwordWithSecret, hashedPassword);
}

export async function hashPassword(
  password: string,
  configService: ConfigService,
): Promise<string> {
  const secret = process.env.PASSWORD_SECRET;
  const passwordWithSecret = password;
  const hashedPassword = await bcrypt.hash(passwordWithSecret, 10);
  console.log(hashedPassword, "hashped pasowrd")
  return hashedPassword;
}

export function encryptPassword(
  password: string,
  configService: ConfigService,
): string {
  const secret = configService.get<string>(process.env.PASSWORD_SECRET);

  // Generate initialization vector
  const iv = crypto.randomBytes(16);
  const key = crypto.createHash('sha256').update(secret).digest();

  // Create cipher instance
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  // Encrypt the password
  let encrypted = cipher.update(password, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  console.log('debuge');
  // Combine the IV and the encrypted password to return as a single string
  return iv.toString('hex') + ':' + encrypted;
}

export function decryptPassword(
  encryptedPassword: string,
  configService: ConfigService,
): string {
  const secret = configService.get<string>(process.env.PASSWORD_SECRET);

  // Split the IV and the encrypted password
  const [ivHex, encrypted] = encryptedPassword.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const key = crypto.createHash('sha256').update(secret).digest();

  // Create decipher instance
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  // Decrypt the password
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
}


export function generateUniqueString() {
  return `id_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}