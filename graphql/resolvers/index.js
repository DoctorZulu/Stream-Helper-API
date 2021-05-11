import usersResolvers from "./users.js";
import movieResolvers from "./movies.js";
import userMovieConnection from "./usermovieconnection.js";
import GraphQLJSON from "graphql-type-json";

export default {
  Query: {
    ...usersResolvers.Query,
    ...movieResolvers.Query,
    ...userMovieConnection.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...userMovieConnection.Mutation,
  },
  JSON: GraphQLJSON
};
