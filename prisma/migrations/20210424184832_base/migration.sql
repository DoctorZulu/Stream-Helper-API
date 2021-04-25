/*
  Warnings:

  - Made the column `providerId` on table `WatchProvider` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WatchProvider" ALTER COLUMN "providerId" SET NOT NULL;
