import db from "../utils/generatePrisma.js";
import fetch from "node-fetch";
const megaSeed = () => {
  let urls = [];
  let pageTotal = 430;
  const urlArray = () => {
    for (let i = 1; i < 430; i++) {
      urls.push(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=999a045dba2d80d839d8ed4db5942fae&language=en-US&page=${i}`,
      );
    }
  };
  urlArray();
  let data = [];
  let promises = urls.map((url) => fetch(url).then((res) => res.json()));
  Promise.all(promises).then((json) => {
    let deconstructed = [];
    let fullData = [];
    let newMergedData;
    for (let i = 0; i < 429; i++) {
      /* dataArray.push(json[i]); */
      deconstructed = json[i].results.map((movie) => {
        return movie;
      });
      fullData.push(deconstructed);
    }
    newMergedData = [].concat.apply([], fullData);
    newMergedData.forEach((movie) => {
      const mainAddMovie = async () => {
        let newMovie = await db.movie.upsert({
          create: {
            id: movie.id,
            title: movie.title,
            backdrop: null,
            original_language: movie.original_language,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            image: movie.poster_path,
            overview: movie.overview,
            genres: movie.genre_ids[0] || null,
          },
          update: {},
          where: {
            id: movie.id,
          },
        });
        return newMovie;
      };
      mainAddMovie();
    });
    // console.log(newMergedData.length);
    /*   let createdMovie = db.movie.createMany({
      data: [
        {
          id: movie.id,
          title: movie.title,
          original_language: movie.original_language,
          overview: movie.overview,
          release_date: movie.release_date,
          image: movie.poster_path,
          vote_average: movie.vote_average,
          genres: movie.genre_ids[0],
        },]}) */
  });
  // console.log(data);
};
export default megaSeed;
