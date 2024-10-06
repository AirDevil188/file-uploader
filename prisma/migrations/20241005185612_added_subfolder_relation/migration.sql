-- AlterTable
ALTER TABLE "folder" ADD COLUMN     "subfolderId" TEXT;

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_subfolderId_fkey" FOREIGN KEY ("subfolderId") REFERENCES "folder"("name") ON DELETE SET NULL ON UPDATE CASCADE;
