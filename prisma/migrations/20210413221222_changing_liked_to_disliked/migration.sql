/*
  Warnings:

  - You are about to drop the column `liked` on the `UserMovieConnection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserMovieConnection" DROP COLUMN "liked",
ADD COLUMN     "disliked" BOOLEAN DEFAULT false;
