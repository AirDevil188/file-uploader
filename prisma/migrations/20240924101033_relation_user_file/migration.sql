/*
  Warnings:

  - Added the required column `fileId` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" ADD COLUMN     "fileId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
