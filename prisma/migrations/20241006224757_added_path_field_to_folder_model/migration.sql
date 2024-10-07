/*
  Warnings:

  - You are about to drop the column `url` on the `folder` table. All the data in the column will be lost.
  - Added the required column `path` to the `folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "folder_url_key";

-- AlterTable
ALTER TABLE "folder" DROP COLUMN "url",
ADD COLUMN     "path" TEXT NOT NULL;
