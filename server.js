import express from "express";
import prisma from "@prisma/client";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";

async function startApolloServer() {
  const app = express();
  const db = new prisma.PrismaClient({
    log: ["info", "warn"],
    errorFormat: "pretty",
  });

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req }) => ({ req }),
  });

  //Middleware
  // app.set("trust proxy", true);

  // Disable until depolyment, ill create a check later ---Sean
  const corsOptions = {
    origin: "http://localhost:3000", //change with your own client URL
    credentials: true,
    // methods: ["GET", "POST"],
  };
  // app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept",
  //   );
  //   next();
  // });
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(
    cookieSession({
      signed: false,
      secure: false,
    }),
  );

  await server.start();
  server.applyMiddleware({ app, path: "/graphql", cors: false });
  await new Promise((resolve) => app.listen({ port: 4025 }, resolve));
  console.log(`
<<<<<<< HEAD
  Server is running
  Listening on port 4025
  http://localhost:4025
  studio.apollographql.com/dev`);
});
=======
    Server is running
    Listening on port 4025
    http://localhost:4025/graphql
    studio.apollographql.com/dev`);
  return { server, app };
}
startApolloServer();
>>>>>>> dfeee61a80ff24e2ec71d55cb4f090424e9bf833
