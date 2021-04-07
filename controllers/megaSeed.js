import express from "express";
import prisma from "@prisma/client";
import fetch from "node-fetch";
import flatten from "array-flatten";

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});

const megaSeed = () => {
  let urls = [];
  let pageTotal = 430;
  const urlArray = () => {
    for (let i = 1; i < 4; i++) {
      urls.push(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=999a045dba2d80d839d8ed4db5942fae&language=en-US&page=${i}`
      );
    }
  };

  urlArray();

  let promises = urls.map((url) => fetch(url).then((res) => res.json()));

  Promise.all(promises).then((json) => {
    let dataArray = [];
    let deconstructed = [];
    let fullData = [];
    let newMergedData;

    for (let i = 0; i < 3; i++) {
      /* dataArray.push(json[i]); */

      deconstructed = json[i].results.map((movie) => {
        return movie;
      });

      fullData.push(deconstructed);
    }
    newMergedData = [].concat.apply([], fullData);
    console.log(newMergedData);

    /*     let createdMovie = db.movie.createMany({
      data: [
        {
          id: json[0].results[0].id,
          title: json[0].results[0].title,
          original_language: json[0].results[0].original_language,
          overview: json[0].results[0].overview,
          release_date: json[0].results[0].release_date,
          image: json[0].results[0].poster_path,
          vote_average: json[0].results[0].vote_average,
          genres: json[0].results[0].genre_ids[0],
        },
       
 */
  });
};

export default megaSeed;
