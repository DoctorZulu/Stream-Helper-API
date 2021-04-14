import express, { json } from "express";
import prisma from "@prisma/client";

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});
let idList = [];
const megaDetailSeed = () => {
  /* idList = []; */

  const queryMovies = async () => {
    let newMovie = await db.movie.findMany({
      select: {
        id: true,
      },
    });

    for (let i = 0; i < newMovie.length; i++) {
      idList.push(newMovie[i].id);
    }
    console.log(idList);
    return idList;
  };
  queryMovies();

  console.log("==================", idList);
};

export default megaDetailSeed;
