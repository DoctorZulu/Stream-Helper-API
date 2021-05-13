import db from "../../utils/generatePrisma.js";
import { UserInputError } from "apollo-server-errors";

import checkAuth from "../../utils/check-auth.js";

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

    /* SHOW ALL MOVIES A USER HAS INTERACTED WITH */

    userMovieRecommendations: async (_, { take, skip, myCursor }, context) => {
      const user = checkAuth(context);
      try {
        if (!user) {
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }
        const foundMovieConnections = await db.userMovieConnection.findMany({
          where: { userId: user.id },
        });
        let idArray = [];
        for (let i = 0; i < foundMovieConnections.length; i++) {
          idArray.push(foundMovieConnections[i].id);
        }

        const test2 = await db.movie.findMany({
          where: {
            NOT: {
              id: { in: idArray },
            },
          },
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
        });
        return test2;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     *
     * @param {*} _
     * @param {*} param1
     * @param {*} context
     * @returns Movies from providers
     */
    providerMovieQuery: async (
      _,
      { take, skip, myCursor, providerId },
      context,
    ) => {
      try {
        const user = checkAuth(context);
        let arrayOfIds;
        if (providerId) {
          arrayOfIds = providerId.map((provider) => {
            return parseInt(provider.id);
          });
        }
        if (!user) {
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }
        const foundMovieConnections = await db.userMovieConnection.findMany({
          where: { userId: user.id },
        });
        let idArray = [];
        for (let i = 0; i < foundMovieConnections.length; i++) {
          idArray.push(foundMovieConnections[i].id);
        }
        if (arrayOfIds) {
          const filteredMovie = await db.movie.findMany({
            include: { watchproviders: true },
            where: {
              NOT: {
                id: { in: idArray },
              },
              watchproviders: {
                some: {
                  providerId: { in: [...arrayOfIds] },
                },
              },
            },
            take: take,
            skip: skip,
            cursor: {
              categoryId: parseInt(myCursor),
            },
            orderBy: [
              {
                categoryId: "asc",
              },
            ],
          });
          return filteredMovie;
        } else {
          const test2 = await db.movie.findMany({
            where: {
              NOT: {
                id: { in: idArray },
              },
            },
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
          });
          return test2;
        }
      } catch (error) {
        // console.log(error);
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
        const allMovie = await db.movie.findLast({
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
     *
     * @param {*} _
     * @param {*} providersId:{ id: Int}
     * @returns Returns length of arrays needed for Pagination
     */
    filterLength: async (_, { providerId }) => {
      try {
        let arrayOfIds;
        if (providerId) {
          arrayOfIds = providerId.map((provider) => {
            return parseInt(provider.id);
          });
        }
        const allMovie = await db.movie.findMany({
          where: {
            watchproviders: {
              some: {
                providerId: { in: [...arrayOfIds] },
              },
            },
          },
        });
        return allMovie.length;
      } catch (error) {
        throw new Error(error);
      }
    },

    movieLength: async (_, args) => {
      try {
        const allMovie = await db.movie.findMany({});
        return allMovie.length;
      } catch (error) {
        throw new Error(error);
      }
    },

    /**
     * @param {} _
     * @param {Take: int, skip: int, myCursor: int} param1
     * @returns WATCHED MOVIES IN DB
     */

    getCast: async (_, { movieId }) => {
      try {
        const cast = await db.credits.findFirst({
          where: { movieId: Number(movieId) },
        });
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

        /* all movies user interacted with */
        const foundMovieConnections = await db.userMovieConnection.findMany(
          opArgs,
        );
        let idArray = [];
        for (let i = 0; i < foundMovieConnections.length; i++) {
          idArray.push(foundMovieConnections[i].id);
        }

        const filteredList = await db.movie.findMany({
          where: {
            NOT: {
              id: { in: idArray },
            },
          },
        });

        let filteredArray = [];
        for (let i = 0; i < filteredList.length; i++) {
          filteredArray.push(filteredList[i].id);
        }

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
            id: {
              in: filteredArray,
            },
          },
        });
      } catch (error) {
        throw new Error(error);
      }
    },

    movie: async (parent, { movieId }) => {
      try {
        const movie = db.movie.findUnique({
          where: { id: Number(movieId) },
          include: {
            credits: true,
            watchproviders: true,
          },
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
    movieSearch: async (parent, { movieTitle }) => {
      try {
        const movie = await db.movie.findMany({
          take: 10,
          where: {
            title: {
              contains: movieTitle,
              mode: "insensitive",
            },
          },
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
