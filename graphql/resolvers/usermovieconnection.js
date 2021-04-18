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

    /* SAVED MOVIES */
    savedMovies: async (_, args, context) => {
      const user = checkAuth(context);
      try {
        if (!user) {
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }
        const opArgs = {
          where: { saved: true, userId: user.id },
        };
        return await db.userMovieConnection.findMany(opArgs);
      } catch (error) {
        throw new Error(error);
      }
    },

    /* DISLIKED MOVIES */
    dislikedMovies: async (_, args, context) => {
      const user = checkAuth(context);
      try {
        if (!user) {
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }
        const opArgs = {
          where: { disliked: true, userId: user.id },
        };
        return await db.userMovieConnection.findMany(opArgs);
      } catch (error) {
        throw new Error(error);
      }
    },

    /* SHOW ALL MOVIES A USER HAS INTERACTED WITH */

    userMovieRecommendations: async (_, { take, skip, myCursor }, context) => {
      const user = checkAuth(context);
      try {
        if (!user) {
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }
        const opArgs = {
          where: { userId: user.id },
        };
        const foundMovieConnections = await db.userMovieConnection.findMany(
          opArgs
        );
        let idArray = [];
        for (let i = 0; i < foundMovieConnections.length; i++) {
          idArray.push(foundMovieConnections[i].id);
        }
        console.log(idArray, "====id arr");
        return db.movie.findMany({
          take: take,
          skip: skip,
          cursor: {
            categoryId: myCursor,
          },
          orderBy: [
            {
              categoryId: "asc",
            },
          ],
          where: {
            NOT: {
              id: { in: idArray },
            },
          },
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addMovieToUser: async (
      parent,
      { movieId, saved, watched, disliked, liked },
      context
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
          liked: liked,
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
