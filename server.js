import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import fetch from "node-fetch";
import db from "./utils/generatePrisma.js";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
import megaSeed from "./controllers/megaSeed.js";
import megaProviderSeed from "./controllers/megaProviderSeed.js";
import megaCreditSeed from "./controllers/megaCreditSeed.js";
import megaVideoSeed from "./controllers/megaVideoSeed.js";
import megaBackdropSeed from "./controllers/megaBackdrop.js";

async function startApolloServer() {
  const app = express();

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req }) => ({ req }),
  });

  //Middleware
  // app.set("trust proxy", true);

  const whitelist = [
    "https://studio.apollographql.com",
    "http://localhost:3000",
    "http://localhost:4025/graphql",
    "https://stream-helper.vercel.app",
    "http://stream-helper.vercel.app",
    "https://stream-helper-git-master-victordoyle.vercel.app",
    "https://stream-helper-victordoyle.vercel.app",
    "http://stream-helper-api.herokuapp.com",
    "https://stream-helper-api.herokuapp.com",
    "http://stream-helper-api.herokuapp.com/graphql",
    "https://stream-helper-api.herokuapp.com/graphql",
  ];

  app.use(cors({ credentials: true, origin: whitelist }));
  app.use(express.json());
  /*   app.use(cors(corsOptions)); */
  app.use(cookieParser());

  app.set("trust proxy", 1);
  app.use(
    cookieSession({
      name: "cookie",
      signed: false,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    }),
  );

  await server.start();
  server.applyMiddleware({ app, path: "/graphql", cors: false });
  /* heroku deployment */
  await new Promise((resolve) =>
    app.listen({ port: process.env.PORT || 4025 }, resolve),
  );

  console.log(`
    Server is running
    Listening on port 4025
    http://localhost:4025/graphql
    studio.apollographql.com/dev`);
  return { server, app };
}
// process.on("warning", (e) => console.warn(e.stack));

// megaSeed();
// megaCreditSeed();
megaProviderSeed();
// megaVideoSeed();
// megaBackdropSeed();

startApolloServer();

/* iterateThroughPages(); */
