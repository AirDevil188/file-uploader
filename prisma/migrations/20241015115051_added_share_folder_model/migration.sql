-- CreateTable
CREATE TABLE "shareFolder" (
    "id" TEXT NOT NULL,
    "shareFolderId" TEXT NOT NULL,

    CONSTRAINT "shareFolder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shareFolder" ADD CONSTRAINT "shareFolder_shareFolderId_fkey" FOREIGN KEY ("shareFolderId") REFERENCES "folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
