import express from "express";
import prisma from "@prisma/client";
import cors from "cors";
import { ApolloServer } from "apollo-server";
import cookieSession from "cookie-session";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
const app = express();

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});

// Configure
const PORT = process.env.PORT || 4000;

//Middleware
app.set("trust proxy", true);
app.use(express.json());
app.use(cors());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
);

//Apollo GQL Server

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({ req }) => ({ req }),
});

server.listen({ port: 4025 }).then(() => {
  console.log(`
  Server is running
  Listening on port 4025
  http://localhost:4025
  studio.apollographql.com/dev`);
  console.log(resolvers.Query.allUsers);
});
