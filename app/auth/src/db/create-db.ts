import dotenv from 'dotenv';
import sequelize from './db';

dotenv.config();

async function createDb() {
  try {
    console.log(`Creating database ${process.env.POSTGRES_DB}...`);
    await sequelize.query(`CREATE DATABASE ${process.env.POSTGRES_DB}`);
    console.log(`Database ${process.env.DB_NAME} created successfully`);
  } catch (error) {
    console.error(`Unable to create database: ${error}`);
  } finally {
    await sequelize.close();
  }
}

createDb();
