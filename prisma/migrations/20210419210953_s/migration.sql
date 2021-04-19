/*
  Warnings:

  - The `actors` column on the `Credits` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `crew` column on the `Credits` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Credits" DROP COLUMN "actors",
ADD COLUMN     "actors" JSONB,
DROP COLUMN "crew",
ADD COLUMN     "crew" JSONB;
