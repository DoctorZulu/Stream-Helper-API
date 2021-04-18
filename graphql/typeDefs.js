import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  type User {
    id: ID
    firstname: String
    lastname: String
    username: String
    email: String
    token: String
    password: String
    moviesSaved: [UserMovieConnection]
    moviesWatched: [UserMovieConnection]
    moviesDisliked: [UserMovieConnection]
  }

  type UserMovieConnection {
    id: ID
    user: [User]
    movies: [Movie]
    title: String
    image: String
    liked: Boolean
    watched: Boolean
    saved: Boolean
  }

  type Movie {
    id: ID!
    categoryId: ID
    title: String
    original_language: String
    release_date: String
    runtime: Int
    vote_average: Float
    overview: String
    image: String
    genres: [Genre]
    user: [User]
  }
  type Genre {
    id: ID!
    name: String
    movies: [Movie]
  }

  # Top level
  type Query {
    allMovies(take: Int, skip: Int, myCursor: Int): [Movie]
    watchedMovies: [UserMovieConnection]
    lastMovie: Movie
    movie(movieId: ID!): Movie
    user(userId: ID!): User
    verifyUser: User
    userMovieConnection(movieId: ID!): Movie
  }
  type Mutation {
    signupUser(signupInput: SignupInput): User!
    signinUser(email: String!, password: String!): User!
    updateUser(username: String, firstname: String, email: String): User
    addMovieToUser(
      movieId: ID
      disliked: Boolean
      saved: Boolean
      watched: Boolean
    ): User!
    removeMovieToUser(movieId: ID): User!
  }
  input SignupInput {
    email: String!
    username: String!
    # firstname: String!
    # lastname: String
    password: String!
  }
`;

export default typeDefs;
