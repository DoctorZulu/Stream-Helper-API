import express from "express";
import prisma from "@prisma/client";
import cors from "cors";
import { ApolloServer } from "apollo-server";
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

app.use(express.json());
app.use(cors());

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
