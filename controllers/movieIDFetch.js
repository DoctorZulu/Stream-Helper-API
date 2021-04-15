import prisma from "@prisma/client";

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});

async function movieIDFetch() {
  let idList = [];
  let newMovie = await db.movie.findMany({
    select: {
      id: true,
    },
  });
  for (let i = 0; i < newMovie.length; i++) {
    idList.push(newMovie[i].id);
  }

  console.log(this);
  return idList;
}
/* const [idList] = movieIDFetch();

console.log(idList); */

/* const movieIDFetch = async () => {
  let idList = [];
  let newMovie = await db.movie.findMany({
    select: {
      id: true,
    },
  });

  for (let i = 0; i < newMovie.length; i++) {
    idList.push(newMovie[i].id);
  }

  return idList;
}; */

export default movieIDFetch;
