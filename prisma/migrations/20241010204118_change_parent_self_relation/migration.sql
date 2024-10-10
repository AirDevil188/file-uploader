-- DropForeignKey
ALTER TABLE "folder" DROP CONSTRAINT "folder_subfolderId_fkey";

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_subfolderId_fkey" FOREIGN KEY ("subfolderId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
