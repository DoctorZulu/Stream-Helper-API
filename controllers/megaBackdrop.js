import db from "../utils/generatePrisma.js";
import fetch from "node-fetch";

const result = await db.$queryRaw(
  'SELECT ID FROM "Movie" ORDER BY "categoryId" ASC;',
);
const megaBackdropSeed = () => {
  let urls = [];

  const urlArray = () => {
    for (let i = 1; i < 8570; i++) {
      urls.push(
        `https://api.themoviedb.org/3/movie/${result[i].id}/images?api_key=ef1238b54f2a84b577b966e1ac3e38d5`,
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
      // console.log(movie.backdrops[0].file_path);
      const mainAddBackdrop = async () => {
        let newBackdrop = await db.movie.update({
          where: {
            id: movie.id,
          },
          data: {
            backdrop: movie.backdrops[0] ? movie.backdrops[0].file_path : null,
          },
        });
        return newBackdrop;
      };
      mainAddBackdrop();
      // setTimeout(callback, 5000);
    });
  });
  // setTimeout(callback, 5000);
};
// };

export default megaBackdropSeed;
