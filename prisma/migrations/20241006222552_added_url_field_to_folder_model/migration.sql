/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `folder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "folder" ADD COLUMN     "url" TEXT NOT NULL DEFAULT '/${name}';

-- CreateIndex
CREATE UNIQUE INDEX "folder_url_key" ON "folder"("url");
