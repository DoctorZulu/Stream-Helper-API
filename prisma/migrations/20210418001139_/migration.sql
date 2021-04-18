/*
  Warnings:

  - A unique constraint covering the columns `[movieId]` on the table `Credits` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[movieId]` on the table `WatchProvider` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Credits_movieId_unique" ON "Credits"("movieId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchProvider_movieId_unique" ON "WatchProvider"("movieId");
