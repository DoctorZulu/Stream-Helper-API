import db from "../utils/generatePrisma.js";
import fetch from "node-fetch";

const result = await db.$queryRaw(
  'SELECT ID FROM "Movie" ORDER BY "categoryId" ASC;'
);
const megaKeywordSeed = () => {
  let urls = [];

  const urlArray = () => {
    for (let i = 1; i < 8570; i++) {
      urls.push(
        `https://api.themoviedb.org/3/movie/${result[i].id}/keywords?api_key=999a045dba2d80d839d8ed4db5942fae`
      );
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

    /* console.log(newMergedData, "here") */
    newMergedData.forEach((movie) => {
      index++;

      const mainAddKeywords = async () => {
        let newMovieKeywords = await db.movie.update({
          where: {
            id: movie.id,
          },
          data: {
            movieKeywords: movie.keywords
              ? JSON.stringify(movie.keywords)
              : null,
          },
        });

        return newMovieKeywords;
      };
      mainAddKeywords();
    });
  });
};

export default megaKeywordSeed;
