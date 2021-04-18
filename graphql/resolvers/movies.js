import prisma from "@prisma/client";
import { UserInputError } from "apollo-server-errors";

import checkAuth from "../../utils/check-auth.js";

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});

export default {
  Query: {
    /**
     * @param {} _
     * @param {Take: int, skip: int, myCursor: int} param1
     * @returns ALL MOVIES IN DB
     */
    allMovies: async (_, { take, skip, myCursor }) => {
      try {
        const opArgs = {
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
        };
        return await db.movie.findMany(opArgs);
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * ===============================LAST MOVIE IS DONZO ==================================
     * @param {} _
     * @param {*} args
     * @returns LAST MOVIE IN LIST
     */
    lastMovie: async (_, args) => {
      try {
        const allMovie = await db.movie.findFirst({
          orderBy: {
            categoryId: "asc",
          },
        });
        return allMovie;
      } catch (error) {
        throw new Error(error);
      }
    },

    /**
     * @param {} _
     * @param {Take: int, skip: int, myCursor: int} param1
     * @returns WATCHED MOVIES IN DB
     */
    watchedMovies: async (_, args, context /* { take, skip, myCursor } */) => {
      const user = checkAuth(context);
      try {
        if (!user) {
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }
        const opArgs = {
          where: { watched: true, userId: user.id },
          // take: take,
          // skip: skip,
          // cursor: {
          //   categoryId: myCursor,
          // },
          // orderBy: [
          //   {
          //     categoryId: "asc",
          //   },
          // ],
        };
        return await db.userMovieConnection.findMany(opArgs);
      } catch (error) {
        throw new Error(error);
      }
    },

    getCast: async (_, { movieId }) => {
      try {
        const cast = await db.credits.findFirst({
          where: { movieId: Number(movieId) },
        });
        console.log(cast);
        if (cast) {
          return cast;
        } else {
          throw new Error("Cast not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    getProviders: async (_, { movieId }) => {
      try {
        const providers = db.watchProvider.findUnique({
          where: { movieId: Number(movieId) },
        });
        if (providers) {
          return providers;
        } else {
          throw new Error("Providers not found");
        }
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
          opArgs,
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

    movie: async (parent, { movieId }) => {
      try {
        console.log(movieId);
        const movie = db.movie.findUnique({
          where: { id: Number(movieId) },
          include: { Credits: {} },
        });

        if (movie) {
          return movie;
        } else {
          throw new Error("Movie not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
