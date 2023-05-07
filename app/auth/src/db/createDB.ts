import dotenv from 'dotenv';
import { Client } from 'pg';
import { prisma } from './index';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.production.env' : '.development.env'
});


const createDB = async () => {
  try {
    const DB_NAME = process.env.POSTGRES_DB || 'MeetupDB';
    const DATABASE_URL = process.env.DATABASE_URL;

    if (!DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in the environment variables');
    }

    const client = new Client({
      connectionString: DATABASE_URL.replace(/\/[^/]*$/, ''),
    });
    await client.connect();
    await client.query(`CREATE DATABASE ${DB_NAME}`);
    console.log(`Database ${DB_NAME} created successfully`);
    await client.end();
  } catch (error) {
    console.error(`Unable to create database: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};


createDB();
