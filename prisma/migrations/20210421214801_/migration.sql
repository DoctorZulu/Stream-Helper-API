/*
  Warnings:

  - You are about to drop the column `flatrate` on the `WatchProvider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WatchProvider" DROP COLUMN "flatrate",
ADD COLUMN     "flatRate" TEXT;
