/*
  Warnings:

  - You are about to drop the column `googleId` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('LOCAL', 'GMAIL');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "googleId",
ADD COLUMN     "provider" "Provider" DEFAULT 'LOCAL';
