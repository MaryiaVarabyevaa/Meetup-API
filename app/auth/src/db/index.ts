// @ts-ignore
import { PrismaClient, UserRole, Provider } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma, UserRole, Provider };
