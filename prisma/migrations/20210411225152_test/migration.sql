-- AlterTable
CREATE SEQUENCE "usermovieconnection_id_seq";
ALTER TABLE "UserMovieConnection" ADD COLUMN     "movieId" INTEGER,
ALTER COLUMN "id" SET DEFAULT nextval('usermovieconnection_id_seq');
ALTER SEQUENCE "usermovieconnection_id_seq" OWNED BY "UserMovieConnection"."id";

-- AddForeignKey
ALTER TABLE "UserMovieConnection" ADD FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
