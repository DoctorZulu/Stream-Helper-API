/*
  Warnings:

  - The primary key for the `WatchProvider` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "WatchProvider" DROP CONSTRAINT "WatchProvider_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "movieId" DROP NOT NULL,
ADD PRIMARY KEY ("id");
