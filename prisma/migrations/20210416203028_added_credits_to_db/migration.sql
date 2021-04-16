-- CreateTable
CREATE TABLE "Credits" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER,
    "cast" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Credits" ADD FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
