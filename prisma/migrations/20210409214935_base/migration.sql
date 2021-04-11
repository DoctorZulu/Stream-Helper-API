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
    "id" INTEGER NOT NULL,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL,
    "title" TEXT,
    "original_language" TEXT,
    "release_date" TEXT,
    "vote_average" DOUBLE PRECISION,
    "image" TEXT,
    "overview" TEXT,
    "saved" BOOLEAN DEFAULT false,
    "disliked" BOOLEAN DEFAULT false,
    "watched" BOOLEAN DEFAULT false,
    "genres" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserMovieConnection" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
