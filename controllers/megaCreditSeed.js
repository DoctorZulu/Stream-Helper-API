import db from "../utils/generatePrisma.js";
import fetch from "node-fetch";

const result = await db.$queryRaw(
  'SELECT ID FROM "Movie" ORDER BY "categoryId" ASC;'
);
const megaCreditSeed = () => {
  let urls = [];

  const urlArray = () => {
    for (let i = 1; i < 8570; i++) {
      urls.push(
        `http://api.themoviedb.org/3/movie/${result[i].id}/credits?api_key=999a045dba2d80d839d8ed4db5942fae&language=en-US`
      );
    }
  };

  urlArray();

  let promises = urls.map((url) => fetch(url).then((res) => res.json()));

  // let callback = function () {
  Promise.all(promises).then((json) => {
    let deconstructed = [];
    let fullData = [];
    let newMergedData;

    for (let i = 0; i < 8569; i++) {
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
      // setTimeout(callback, 1000);
    });
  });
  // setTimeout(callback, 1000);
};
// };

export default megaCreditSeed;
