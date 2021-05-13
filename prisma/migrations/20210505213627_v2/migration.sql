-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "UserMovieConnection" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER,
    "userId" INTEGER,
    "title" TEXT,
    "image" TEXT,
    "liked" BOOLEAN DEFAULT false,
    "disliked" BOOLEAN DEFAULT false,
    "saved" BOOLEAN DEFAULT false,
    "watched" BOOLEAN DEFAULT false,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Movie" (
    "categoryId" SERIAL NOT NULL,
    "id" INTEGER,
    "title" TEXT,
    "original_language" TEXT,
    "release_date" TEXT,
    "vote_average" DOUBLE PRECISION,
    "image" TEXT,
    "backdrop" TEXT,
    "overview" TEXT,
    "genres" INTEGER,
    "trailers1" TEXT,
    "trailers2" TEXT,
    "trailers3" TEXT,
    "similarMovies" JSONB,
    "movieKeywords" TEXT,
    PRIMARY KEY ("categoryId")
);
-- CreateTable
CREATE TABLE "Credits" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER,
    "cast" JSONB,
    "actors" TEXT,
    "crew" TEXT,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "WatchProvider" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER,
    "providers" TEXT,
    "buy" TEXT,
    "rent" TEXT,
    "flatRate" TEXT,
    "providerId" INTEGER,
    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "movieId" INTEGER,
    PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");
-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
-- CreateIndex
CREATE UNIQUE INDEX "Movie.id_unique" ON "Movie"("id");
-- CreateIndex
CREATE UNIQUE INDEX "Credits.movieId_unique" ON "Credits"("movieId");
-- AddForeignKey
ALTER TABLE "UserMovieConnection" ADD FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "UserMovieConnection" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Credits" ADD FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "WatchProvider" ADD FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Genre" ADD FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;