import fetch from "node-fetch";
import db from "../utils/generatePrisma.js";

// const db = new prisma.PrismaClient({
//   log: ["info", "warn"],
//   errorFormat: "pretty",
// });
const result = await db.$queryRaw(
  'SELECT ID FROM "Movie" ORDER BY "categoryId" ASC;',
);
const megaVideoSeed = () => {
  let urls = [];

  const urlArray = () => {
    for (let i = 1; i < 6500; i++) {
      urls.push(
        `https://api.themoviedb.org/3/movie/${result[i].id}/videos?api_key=ef1238b54f2a84b577b966e1ac3e38d5&language=en-US`,
      );
    }
  };
  // video api
  // https://api.themoviedb.org/3/movie/${result[i].id}/videos?api_key=ef1238b54f2a84b577b966e1ac3e38d5

  urlArray();

  let promises = urls.map((url) => fetch(url).then((res) => res.json()));

  // let callback = function () {
  Promise.all(promises).then((json) => {
    let deconstructed = [];
    let fullData = [];
    let newMergedData;

    for (let i = 0; i < 6499; i++) {
      deconstructed.push(json[i]);
    }
    fullData.push(deconstructed);
    newMergedData = [].concat.apply([], fullData);
    let index = -1;
    newMergedData.forEach((movie) => {
      index++;
      // console.log(
      //   movie.results[0] ? JSON.stringify(movie.results[0].key) : null,
      // );
      const mainAddVideo = async () => {
        let newVideo = await db.movie.update({
          where: {
            id: movie.id,
          },
          data: {
            trailers1: movie.results[0]
              ? JSON.stringify(movie.results[0].key)
              : null,
            trailers2: movie.results[1]
              ? JSON.stringify(movie.results[1].key)
              : null,
            trailers3: movie.results[2]
              ? JSON.stringify(movie.results[2].key)
              : null,
          },
        });
        return newVideo;
      };
      mainAddVideo();
      // setTimeout(callback, 5000);
    });
  });
  // setTimeout(callback, 5000);
};
// };

export default megaVideoSeed;
