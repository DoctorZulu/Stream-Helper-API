/*
  Warnings:

  - You are about to drop the column `netflix` on the `WatchProvider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WatchProvider" DROP COLUMN "netflix",
ADD COLUMN     "providerId" INTEGER;
