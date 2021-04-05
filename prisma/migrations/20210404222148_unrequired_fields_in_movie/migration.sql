-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "original_language" DROP NOT NULL,
ALTER COLUMN "release_date" DROP NOT NULL,
ALTER COLUMN "vote_average" DROP NOT NULL;
