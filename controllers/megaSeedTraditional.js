import express, { json } from "express";
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

  var obj;
  urlArray();
  const fetchAll = () => {
    let jsonData = [];
    for (let i = 0; i < urls.length; i++) {
      fetch(urls[i])
        .then((res) => res.json())
        .then((data) => (obj = data))
        .then(() => console.log(obj));
    }
  };

  fetchAll();
};

export default megaSeed;
