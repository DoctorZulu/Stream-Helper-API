import usersResolvers from "./users.js";
import movieResolvers from "./movies.js";
import userMovieConnection from "./usermovieconnection.js";

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
};
