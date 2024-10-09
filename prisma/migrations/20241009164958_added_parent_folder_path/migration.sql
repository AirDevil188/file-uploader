/*
  Warnings:

  - Added the required column `parentPath` to the `folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "folder" ADD COLUMN     "parentPath" TEXT NOT NULL;
