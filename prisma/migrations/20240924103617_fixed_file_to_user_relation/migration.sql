/*
  Warnings:

  - You are about to drop the column `fileId` on the `file` table. All the data in the column will be lost.
  - Added the required column `userId` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_fileId_fkey";

-- AlterTable
ALTER TABLE "file" DROP COLUMN "fileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
