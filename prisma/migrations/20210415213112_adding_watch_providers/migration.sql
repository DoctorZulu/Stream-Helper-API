-- CreateTable
CREATE TABLE "WatchProvider" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER,
    "providers" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WatchProvider" ADD FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
