import db from "../utils/generatePrisma.js";
import fetch from "node-fetch";
const result = await db.$queryRaw(
  'SELECT ID FROM "Movie" ORDER BY "categoryId" ASC;',
);
const megaSimilarMovies = () => {
  let urls = [];
  let idArray = [];
  const urlArray = () => {
    for (let i = 1; i < 8570; i++) {
      urls.push(
        `https://api.themoviedb.org/3/movie/${result[i].id}/similar?api_key=999a045dba2d80d839d8ed4db5942fae&language=en-US&page=1`,
      );
      idArray.push(result[i].id);
    }
  };
  urlArray();
  let promises = urls.map((url) => fetch(url).then((res) => res.json()));
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

    newMergedData.forEach((similarMovies) => {
      index++;
      let similarMovie = [];
      for (let j = 0; j < 8; j++) {
        similarMovie.push({
          id: similarMovies.results[j] ? similarMovies.results[j].id : null,
          poster_path: similarMovies.results[j]
            ? similarMovies.results[j].poster_path
            : null,
        });
      }
      const mainAddSimilar = async () => {
        let newSimilarMovie = await db.movie.update({
          data: {
            similarMovies: similarMovie ? similarMovie : null,
          },
          where: {
            id: idArray[index],
          },
        });

        return newSimilarMovie;
      };
      mainAddSimilar();
    });
  });
};
export default megaSimilarMovies;
