import express, { json } from "express";
import prisma from "@prisma/client";
import fetch from "node-fetch";
import ids from "../data/movieID.js";

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});


const megaCreditSeed = () => {
  const result =  db.$queryRaw(
    'SELECT ID FROM "Movie" ORDER BY "categoryId" ASC;',
  );
  let urls = [];

  const urlArray = () => {
    for (let i = 1; i < 51; i++) {
      urls.push(
        `https://api.themoviedb.org/3/movie/${ids[i]}/credits?api_key=999a045dba2d80d839d8ed4db5942fae&language=en-US`,
      );
    }
  };
  urlArray();

  let promises = urls.map((url) => fetch(url).then((res) => res.json()));

  Promise.all(promises).then((json) => {
    let deconstructed = [];
    let fullData = [];
    let newMergedData;

    for (let i = 0; i < 50; i++) {
      deconstructed.push(json[i]);
    }

    fullData.push(deconstructed);

    newMergedData = [].concat.apply([], fullData);

    let index = -1;
    newMergedData.forEach((movie) => {
      index++;

      const mainAddCredit = async () => {
        let newCredit = await db.credits.create({
          data: {
            movieId: movie.id,
            cast: JSON.stringify(movie),
            actors: JSON.stringify(movie.cast),
            crew: JSON.stringify(movie.crew),
          },
        });
        // console.log(movie);

        return newCredit;
      };
      mainAddCredit();
    });
  });
};

export default megaCreditSeed;
