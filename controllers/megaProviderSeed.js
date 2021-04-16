import express, { json } from "express";
import prisma from "@prisma/client";

import fetch from "node-fetch";
import ids from "../data/movieID.js";

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});

const megaProviderSeed = () => {
  let urls = [];

  const urlArray = () => {
    for (let i = 1; i < 10; i++) {
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

    for (let i = 0; i < 9; i++) {
      deconstructed.push(json[i].results.US);
    }

    fullData.push(deconstructed);

    newMergedData = [].concat.apply([], fullData);

    let index = -1;
    newMergedData.forEach((movie) => {
      index++;
      console.log(ids[index]);
      const mainAddMovie = async () => {
        let newMovie = await db.watchProvider.upsert({
          create: {
            movieId: ids[index],
            providers: movie,
          },
          update: {},
          where: {
            id: index,
          },
        });

        return newMovie;
      };
      mainAddMovie();
    });
  });
};

export default megaProviderSeed;
