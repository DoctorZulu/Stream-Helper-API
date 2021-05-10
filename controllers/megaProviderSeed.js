import express, { json } from "express";
import db from "../utils/generatePrisma.js";
import fetch from "node-fetch";
import ids from "../data/movieID.js";

const result = await db.$queryRaw(
  'SELECT ID FROM "Movie" ORDER BY "categoryId" ASC;',
);

const megaProviderSeed = () => {
  let urls = [];

  const urlArray = () => {
    for (let i = 1; i < 8570; i++) {
      urls.push(
        `https://api.themoviedb.org/3/movie/${result[i].id}/watch/providers?api_key=ef1238b54f2a84b577b966e1ac3e38d5`,
      );
    }
  };
  urlArray();
  let promises = urls.map((url) => fetch(url).then((res) => res.json()));

  Promise.all(promises).then((json) => {
    let deconstructed = [];
    let fullData = [];
    let newMergedData;

    for (let i = 0; i < 8569; i++) {
      deconstructed.push(json[i].results.US);
    }

    fullData.push(deconstructed);

    newMergedData = [].concat.apply([], fullData);
    newMergedData.forEach((movie) => {
      let slash;
      let dash;
      let idExtracted;
      if (movie != undefined && movie.link) {
        slash = movie.link.split("/", 5);
        dash = slash[4].split("-");
        idExtracted = dash[0];
      } else {
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
          // update: {},
          // where: {
          //   movieId: idExtracted != null ? Number(idExtracted) : undefined,
          // },
        });
        return newProvider;
      };
      mainAddProvider();
    });
  });
};

export default megaProviderSeed;
