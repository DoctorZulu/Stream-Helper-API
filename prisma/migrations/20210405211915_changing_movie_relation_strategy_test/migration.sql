/*
  Warnings:

  - You are about to drop the column `userId` on the `Movie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_userId_fkey";

-- AlterTable
ALTER TABLE "Genre" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserMovieConnection" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserMovieConnection" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
