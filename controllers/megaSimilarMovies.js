import db from "../utils/generatePrisma.js";
import fetch from "node-fetch";

const result = await db.$queryRaw(
  'SELECT ID FROM "Movie" ORDER BY "categoryId" ASC;',
);
const megaSimilarMovies = () => {
  let urls = [];

  const urlArray = () => {
    for (let i = 1; i < 50; i++) {
      urls.push(
        `https://api.themoviedb.org/3/movie/${result[i].id}/similar?api_key=999a045dba2d80d839d8ed4db5942fae&language=en-US&page=1`,
      );
    }
  };

  urlArray();

  let promises = urls.map((url) => fetch(url).then((res) => res.json()));

  Promise.all(promises).then((json) => {
    let deconstructed = [];
    let fullData = [];
    let newMergedData;
    console.log(result, "JSON res")

    for (let i = 0; i < 49; i++) {
      deconstructed.push(json[i]);
    }
    fullData.push(deconstructed);
    newMergedData = [].concat.apply([], fullData);
    let index = -1;

 
    newMergedData.forEach((similarMovie) => {
      index++;
      let baseMovieIds = []
      for (let i = 1; i < 50; i++) {
        baseMovieIds.push(result[i].id)
      }
  
   
      const mainAddSimilar = async () => {
        let newSimilarMovie = await db.movie.update({
          where: {
            id: movie.id,
          },
          data: {
            similarMovies: movie.results ? movie.results : null,
          },
        });
        console.log(newSimilarMovie, "here")
        return newSimilarMovie;
      };
      mainAddSimilar();
    });
  });
};

export default megaSimilarMovies;
