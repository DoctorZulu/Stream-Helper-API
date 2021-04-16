import express, { json } from "express";
import prisma from "@prisma/client";

import fetch from "node-fetch";
import ids from "../data/movieID.js";

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});
const result = await db.$queryRaw(
  'SELECT ID FROM "Movie" ORDER BY "categoryId" ASC;'
);

const megaProviderSeed = () => {
  let urls = [];

  const urlArray = () => {
    for (let i = 1; i < 51; i++) {
      urls.push(
        `https://api.themoviedb.org/3/movie/${ids[i]}/watch/providers?api_key=999a045dba2d80d839d8ed4db5942fae`
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
      deconstructed.push(json[i].results.US);
    }

    fullData.push(deconstructed);

    newMergedData = [].concat.apply([], fullData);
    let movieIdIndex = 0;
    let index = -1;
    newMergedData.forEach((movie) => {
      index++;
      movieIdIndex++;
      console.log(ids[index]);
      const mainAddMovie = async () => {
        let newMovie = await db.watchProvider.upsert({
          create: {
            movieId: result[index].id,
            providers: movie,
          },
          update: {},
          where: {
            id: movieIdIndex,
          },
        });

        return newMovie;
      };
      mainAddMovie();
    });
  });
};

export default megaProviderSeed;
