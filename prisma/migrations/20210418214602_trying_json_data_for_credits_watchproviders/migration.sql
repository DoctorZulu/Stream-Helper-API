/*
  Warnings:

  - The `cast` column on the `Credits` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `providers` column on the `WatchProvider` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Credits" DROP COLUMN "cast",
ADD COLUMN     "cast" JSONB;

-- AlterTable
ALTER TABLE "WatchProvider" DROP COLUMN "providers",
ADD COLUMN     "providers" JSONB;
