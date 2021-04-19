-- AlterTable
ALTER TABLE "WatchProvider" ADD COLUMN     "buy" TEXT,
ADD COLUMN     "rent" TEXT,
ADD COLUMN     "flatrate" TEXT,
ALTER COLUMN "providers" SET DATA TYPE TEXT;
