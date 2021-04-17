import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";
import prisma from "@prisma/client";
import checkAuth from "../../utils/check-auth.js";
import { UserInputError } from "apollo-server-errors";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utils/validators.js";

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});

export default {
  Query: {
    user: async (parent, { userId }) => {
      try {
        const user = db.user.findUnique({
          where: { id: Number(userId) },
          include: { movies: true },
        });

        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
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
    signupUser: async (
      parent,
      { signupInput: { email, password, username } }
    ) => {
      try {
        const { valid, errors } = validateRegisterInput(
          username,
          email,
          password
        );
        if (!valid) {
          throw new UserInputError("Errors", { errors });
        }
        const user = await db.user.findUnique({ where: { email } });
        if (user) {
          throw new UserInputError("email is taken", {
            errors: {
              email: "Email is already taken",
            },
          });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        password = hash;
        return db.user.create({
          data: {
            email: email,
            username: username,
            password: password,
          },
        });
      } catch (error) {
        throw new Error(error);
      }
    },

    signinUser: async (parent, { email, password }, { req }) => {
      console.log("attempted sign in");
      const { errors, valid } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { error });
      }
      const foundUser = await db.user.findUnique({
        where: { email },
      });
      console.log(foundUser);
      if (!foundUser) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const isValid = await bcrypt.compare(password, foundUser.password);
      if (!isValid) {
        errors.general = "Incorrect credentials";
        throw new UserInputError("Incorrect credentials", { errors });
      }
      const token = generateToken(foundUser.id);

      // cookies
      req.session = { token: `Bearer ${token}` };
      // this is the latest and greatest token
      // console.log(req.headers.authorization);
      console.log(req.session);
      return { ...foundUser, token: token };
    },

    updateUser: async (
      parent,
      { firstname, lastname, email, username },
      context
    ) => {
      const user = checkAuth(context);
      try {
        if (!user) {
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }
        const newUser = await db.user.update({
          where: { id: user.id },
          data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            
          },
        });
        return newUser;
      } catch (error) {
        throw new Error(error);
      }
    },

    addMovieToUser: async (
      parent,
      { movieId, saved, watched, disliked },
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

    checkCurrentUser: async (_, args, context) => {
      const user = checkAuth(context);
      try {
        if (!user) {
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }
        const foundUser = await db.user.findUnique({
          where: { id: user.id },
        });
        return foundUser;
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
