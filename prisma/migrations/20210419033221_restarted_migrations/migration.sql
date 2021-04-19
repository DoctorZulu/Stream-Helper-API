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
<<<<<<< HEAD:prisma/migrations/20210417174741_dropped_migrations/migration.sql
=======
    "liked" BOOLEAN DEFAULT false,
>>>>>>> origin/master:prisma/migrations/20210419033221_restarted_migrations/migration.sql
    "disliked" BOOLEAN DEFAULT false,
    "saved" BOOLEAN DEFAULT false,
    "watched" BOOLEAN DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "categoryId" SERIAL NOT NULL,
    "id" INTEGER NOT NULL,
    "title" TEXT,
    "original_language" TEXT,
    "release_date" TEXT,
    "vote_average" DOUBLE PRECISION,
    "image" TEXT,
    "overview" TEXT,
    "genres" INTEGER,

    PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Credits" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER,
    "cast" JSONB,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchProvider" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER,
    "providers" JSONB,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Movie.id_unique" ON "Movie"("id");

-- AddForeignKey
ALTER TABLE "UserMovieConnection" ADD FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMovieConnection" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credits" ADD FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchProvider" ADD FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
