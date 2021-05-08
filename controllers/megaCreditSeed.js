import db from "../utils/generatePrisma.js";
import fetch from "node-fetch";

const result = await db.$queryRaw(
  'SELECT ID FROM "Movie" ORDER BY "categoryId" ASC;',
);
const megaCreditSeed = () => {
  let urls = [];

  const urlArray = () => {
<<<<<<< HEAD
    for (let i = 1; i < 20; i++) {
      urls.push(
        `http://api.themoviedb.org/3/movie/${result[i].id}/credits?api_key=ef1238b54f2a84b577b966e1ac3e38d5&language=en-US`
=======
    for (let i = 1; i < 8570; i++) {
      urls.push(
        `http://api.themoviedb.org/3/movie/${result[i].id}/credits?api_key=999a045dba2d80d839d8ed4db5942fae&language=en-US`,
>>>>>>> 95c565635bf1767875b556873eb6cbd08bd318f6
      );
    }
  };

  urlArray();

  let promises = urls.map((url) => fetch(url).then((res) => res.json()));

<<<<<<< HEAD
=======
  // let callback = function () {
>>>>>>> 95c565635bf1767875b556873eb6cbd08bd318f6
  Promise.all(promises).then((json) => {
    let deconstructed = [];
    let fullData = [];
    let newMergedData;

<<<<<<< HEAD
    for (let i = 0; i < 19; i++) {
=======
    for (let i = 0; i < 8569; i++) {
>>>>>>> 95c565635bf1767875b556873eb6cbd08bd318f6
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
<<<<<<< HEAD
    });
  });
};
=======
      // setTimeout(callback, 1000);
    });
  });
  // setTimeout(callback, 1000);
};
// };
>>>>>>> 95c565635bf1767875b556873eb6cbd08bd318f6

export default megaCreditSeed;
