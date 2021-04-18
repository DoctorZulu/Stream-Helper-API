import prisma from "@prisma/client";
import { UserInputError } from "apollo-server-errors";

import checkAuth from "../../utils/check-auth.js";

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});

export default {
  Query: {
    userMovieConnection: async (parent, { movieId }, context) => {
      console.log(movieId);
      const user = checkAuth(context);
      try {
        const foundUser = await db.user.findUnique({
          where: { id: user.id },
        });
        const userMovieConnection = db.userMovieConnection.findUnique({
          where: { id: Number(movieId), userId: Number(foundUser.id) },
        });
        return userMovieConnection;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addMovieToUser: async (
      parent,
      { movieId, saved, watched, disliked },
      context,
    ) => {
      const user = checkAuth(context);
      try {
        if (!user) {
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }
        const foundUser = await db.user.findUnique({
          where: { id: user.id },
        });

        const foundMovie = await db.movie.findUnique({
          where: { id: Number(movieId) },
        });

        const { id, title, image } = foundMovie;

        const movieData = {
          id,
          userId: foundUser.id,
          title,
          image,
          watched: watched,
          saved: saved,
          disliked: disliked,
        };
        const newMovie = await db.userMovieConnection.upsert({
          where: { id: Number(movieId) },
          update: { ...movieData },
          create: {
            ...movieData,
          },
        });
        return newMovie;
      } catch (error) {
        throw new Error(error);
      }
    },

    removeMovieToUser: async (_, { movieId }, context) => {
      console.log(movieId);
      const user = checkAuth(context);
      try {
        if (!user) {
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }
        const foundUser = await db.user.findUnique({
          where: { id: user.id },
        });

        const deleteMovie = await db.userMovieConnection.delete({
          where: {
            id: Number(movieId),
          },
        });

        return deleteMovie;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
