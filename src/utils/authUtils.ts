// authUtils.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secretKey = 'your-secret-key';

export function generateToken(payload: any): string {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  console.log('JWT', token)
  try{
    if(!token) return
    return jwt.verify(token, secretKey);
  }catch(e:any){
    console.log("token is expired:" + e.message)
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, hashedPassword);
}
