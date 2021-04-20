import prisma from "@prisma/client";

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});

async function main() {
  const action = await db.genre.upsert({
    where: { id: 28 },
    update: {},
    create: {
      id: 28,
      name: "Action",
    },
  });
  const adventure = await db.genre.upsert({
    where: { id: 12 },
    update: {},
    create: {
      id: 12,
      name: "Adventure",
    },
  });
  const animation = await db.genre.upsert({
    where: { id: 16 },
    update: {},
    create: {
      id: 16,
      name: "Animation",
    },
  });

  const comedy = await db.genre.upsert({
    where: { id: 35 },
    update: {},
    create: {
      id: 35,
      name: "Comedy",
    },
  });
  const crime = await db.genre.upsert({
    where: { id: 80 },
    update: {},
    create: {
      id: 80,
      name: "Crime",
    },
  });
  const documentary = await db.genre.upsert({
    where: { id: 99 },
    update: {},
    create: {
      id: 99,
      name: "Documentary",
    },
  });
  const drama = await db.genre.upsert({
    where: { id: 18 },
    update: {},
    create: {
      id: 18,
      name: "Drama",
    },
  });
  const family = await db.genre.upsert({
    where: { id: 10751 },
    update: {},
    create: {
      id: 10751,
      name: "Family",
    },
  });
  const fantasy = await db.genre.upsert({
    where: { id: 14 },
    update: {},
    create: {
      id: 14,
      name: "Fantasy",
    },
  });
  const history = await db.genre.upsert({
    where: { id: 36 },
    update: {},
    create: {
      id: 36,
      name: "History",
    },
  });
  const horror = await db.genre.upsert({
    where: { id: 27 },
    update: {},
    create: {
      id: 27,
      name: "Horror",
    },
  });
  const music = await db.genre.upsert({
    where: { id: 10402 },
    update: {},
    create: {
      id: 10402,
      name: "Music",
    },
  });
  const mystery = await db.genre.upsert({
    where: { id: 9648 },
    update: {},
    create: {
      id: 9648,
      name: "Mystery",
    },
  });
  const romance = await db.genre.upsert({
    where: { id: 10749 },
    update: {},
    create: {
      id: 10749,
      name: "Romance",
    },
  });
  const scifi = await db.genre.upsert({
    where: { id: 878 },
    update: {},
    create: {
      id: 878,
      name: "Science Fiction",
    },
  });
  const tvmovie = await db.genre.upsert({
    where: { id: 10770 },
    update: {},
    create: {
      id: 10770,
      name: "TV Movie",
    },
  });
  const thriller = await db.genre.upsert({
    where: { id: 53 },
    update: {},
    create: {
      id: 53,
      name: "Thriller",
    },
  });
  const war = await db.genre.upsert({
    where: { id: 10752 },
    update: {},
    create: {
      id: 10752,
      name: "War",
    },
  });
  const western = await db.genre.upsert({
    where: { id: 37 },
    update: {},
    create: {
      id: 37,
      name: "Western",
    },
  });
  console.log(action);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
