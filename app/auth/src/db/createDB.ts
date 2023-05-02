import { Prisma } from "@prisma/client";
import prisma from "./index";


const createDB = async () => {
  try {
    const DB_NAME = process.env.POSTGRES_DB || "AuthDB";
    const sql = Prisma.sql`CREATE DATABASE ${Prisma.raw(DB_NAME)}`;
    await prisma.$executeRaw(sql);
    console.log(`Database ${DB_NAME} created successfully`);
  } catch (error) {
    console.error(`Unable to create database: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}

createDB();