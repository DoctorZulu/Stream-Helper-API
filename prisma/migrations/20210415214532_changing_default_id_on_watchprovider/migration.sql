/*
  Warnings:

  - The primary key for the `WatchProvider` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `WatchProvider` table. All the data in the column will be lost.
  - Made the column `movieId` on table `WatchProvider` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WatchProvider" DROP CONSTRAINT "WatchProvider_pkey",
DROP COLUMN "id",
ALTER COLUMN "movieId" SET NOT NULL,
ADD PRIMARY KEY ("movieId");
