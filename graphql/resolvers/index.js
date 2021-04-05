import usersResolvers from "./users.js";
import movieResolvers from "./movies.js";

export default {
  Query: {
    ...usersResolvers.Query,
    ...movieResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};
