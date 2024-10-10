/*
  Warnings:

  - You are about to drop the column `subfolderId` on the `folder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "folder" DROP CONSTRAINT "folder_subfolderId_fkey";

-- AlterTable
ALTER TABLE "folder" DROP COLUMN "subfolderId",
ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
