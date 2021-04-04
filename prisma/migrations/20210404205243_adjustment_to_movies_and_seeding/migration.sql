/*
  Warnings:

  - You are about to drop the column `runtime` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "runtime",
ADD COLUMN     "saved" BOOLEAN DEFAULT false,
ADD COLUMN     "disliked" BOOLEAN DEFAULT false,
ADD COLUMN     "watched" BOOLEAN DEFAULT false;
