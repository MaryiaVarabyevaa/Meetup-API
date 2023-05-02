import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma, UserRole };
