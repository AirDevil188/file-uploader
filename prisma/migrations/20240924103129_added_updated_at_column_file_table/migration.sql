/*
  Warnings:

  - Added the required column `updatedAt` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
