/*
  Warnings:

  - You are about to drop the column `parentPath` on the `folder` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `folder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "folder" DROP COLUMN "parentPath",
DROP COLUMN "path";
