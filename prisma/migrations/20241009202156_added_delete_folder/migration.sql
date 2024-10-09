-- DropForeignKey
ALTER TABLE "file" DROP CONSTRAINT "file_folderId_fkey";

-- DropForeignKey
ALTER TABLE "folder" DROP CONSTRAINT "folder_subfolderId_fkey";

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_subfolderId_fkey" FOREIGN KEY ("subfolderId") REFERENCES "folder"("name") ON DELETE CASCADE ON UPDATE CASCADE;
