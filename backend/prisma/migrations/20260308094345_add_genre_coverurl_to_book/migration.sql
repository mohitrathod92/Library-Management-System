-- AlterTable
ALTER TABLE "books" ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "genre" TEXT,
ALTER COLUMN "description" SET DEFAULT '';
