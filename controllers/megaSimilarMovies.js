import db from "../utils/generatePrisma.js";
import fetch from "node-fetch";
const result = await db.$queryRaw(
  'SELECT ID FROM "Movie" ORDER BY "categoryId" ASC;'
);
const megaSimilarMovies = () => {
  let urls = [];
  let idArray = [];
  const urlArray = () => {
    for (let i = 1; i < 50; i++) {
      urls.push(
        `https://api.themoviedb.org/3/movie/${result[i].id}/similar?api_key=999a045dba2d80d839d8ed4db5942fae&language=en-US&page=1`
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
    console.log(result, "JSON res");
    for (let i = 0; i < 49; i++) {
      deconstructed.push(json[i]);
    }
    fullData.push(deconstructed);
    newMergedData = [].concat.apply([], fullData);
    let index = -1;
    /*  console.log(newMergedData, "here") */
    newMergedData.forEach((similarMovie) => {
      index++;
      console.log(similarMovie, "results ");
      const mainAddSimilar = async () => {
        let newSimilarMovie = await db.similarmovie.update({
          data: {
            similarMovies: similarMovie.results ? similarMovie.results : null,
          },
          update: {},
          where: {
            refMovieId: idArray[index],
          },
        });

        return newSimilarMovie;
      };
      mainAddSimilar();
    });
  });
};
export default megaSimilarMovies;
