import express, { json } from "express";
import prisma from "@prisma/client";

import fetch from "node-fetch";
import ids from "../data/movieID.js";

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});
const result = await db.$queryRaw(
  'SELECT ID FROM "Movie" ORDER BY "categoryId" ASC;',
);

const megaProviderSeed = () => {
  let urls = [];

  const urlArray = () => {
    for (let i = 1; i < 71; i++) {
      urls.push(
        `https://api.themoviedb.org/3/movie/${result[i].id}/watch/providers?api_key=999a045dba2d80d839d8ed4db5942fae`,
      );
    }
  };
  urlArray();
  let promises = urls.map((url) => fetch(url).then((res) => res.json()));

  Promise.all(promises).then((json) => {
    let deconstructed = [];
    let fullData = [];
    let newMergedData;

    for (let i = 0; i < 70; i++) {
      deconstructed.push(json[i].results.US);
    }

    fullData.push(deconstructed);

    newMergedData = [].concat.apply([], fullData);
    let counter = 999999;
    newMergedData.forEach((movie) => {
      let slash;
      let dash;
      let idExtracted;
      if (movie != undefined && movie.link) {
        slash = movie.link.split("/", 5);
        dash = slash[4].split("-");
        idExtracted = dash[0];
      } else {
        counter++;
        slash = 0;
        dash = 0;
        idExtracted = null;
      }
      // console.log(idExtracted);

      const mainAddProvider = async () => {
        // console.log(movie.flatrate[0].provider_id);
        let newProvider = await db.watchProvider.create({
          data: {
            movieId: idExtracted != null ? Number(idExtracted) : undefined,
            providers: movie != null ? JSON.stringify(movie) : undefined,
            buy: movie != null ? JSON.stringify(movie.buy) : undefined,
            rent: movie != null ? JSON.stringify(movie.rent) : undefined,
            flatRate:
              movie != null ? JSON.stringify(movie.flatrate) : undefined,
            providerId:
              movie != null && movie.flatrate
                ? Number(JSON.stringify(movie.flatrate[0].provider_id))
                : undefined,
          },
        });
        return newProvider;
      };
      mainAddProvider();
    });
  });
};

export default megaProviderSeed;
