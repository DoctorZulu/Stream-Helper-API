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

const megaCreditSeed = () => {
  let urls = [];


  const urlArray = () => {
    for (let i = 1; i < 2950; i++) {
      urls.push(
        `http://api.themoviedb.org/3/movie/${result[i].id}/credits?api_key=ef1238b54f2a84b577b966e1ac3e38d5&language=en-US`,
        );
      }
    };



    urlArray();

  let promises = urls.map((url) => fetch(url).then((res) => 
  res.json()));


  let callback = function(){
  Promise.all(promises).then((json) => {
    let deconstructed = [];
    let fullData = [];
    let newMergedData;

    for (let i = 0; i < 2949; i++) {
      deconstructed.push(json[i]);
    }

    fullData.push(deconstructed);

    newMergedData = [].concat.apply([], fullData);

    let index = -1;
    newMergedData.forEach((movie) => {
      index++;

      const mainAddCredit = async () => {
        let newCredit = await db.credits.upsert({
          create: {
            movieId: movie.id,
            cast: JSON.stringify(movie),
            actors: JSON.stringify(movie.cast),
            crew: JSON.stringify(movie.crew),
          },
          update: {},
            where: {
              movieId: movie.id,
            },
        });

        return newCredit;
      };
      mainAddCredit();
      setTimeout(callback, 5000);
    });
  });
  setTimeout(callback, 5000);
};
};


export default megaCreditSeed;
