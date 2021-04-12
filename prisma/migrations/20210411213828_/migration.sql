/*
  Warnings:

  - You are about to drop the column `saved` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `disliked` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `watched` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "saved",
DROP COLUMN "disliked",
DROP COLUMN "watched";

-- AlterTable
ALTER TABLE "UserMovieConnection" ADD COLUMN     "liked" BOOLEAN DEFAULT false,
ADD COLUMN     "saved" BOOLEAN DEFAULT false,
ADD COLUMN     "watched" BOOLEAN DEFAULT false;
