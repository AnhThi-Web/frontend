import { compare } from 'bcryptjs';
import { db } from './db';

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}

export async function findAdminByEmail(email: string) {
  return db.adminUser.findUnique({
    where: { email },
  });
}
