import express from "express";
import prisma from "@prisma/client";
import fetch from "node-fetch";

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});

const iterateThroughPages = async () => {
  console.log("running iterate mega function!");
  for (let i = 1; i < 2; i++) {
    let URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=999a045dba2d80d839d8ed4db5942fae&language=en-US&page=${i}`;
    let fetchURL = fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    console.log;
    for (let j = 0; j < 20; j++) {
      const {
        id,
        title,
        original_language,
        release_date,
        vote_average,
        image,
        overview,
        genres,
      } = fetchURL.result[j];
      await db.movie.create({
        data: {
          id,
          title,
          original_language,
          release_date,
          vote_average,
          image,
          overview,
          genres,
        },
      });
    }
  }
  return "Finished iteration";
};

export default iterateThroughPages;
