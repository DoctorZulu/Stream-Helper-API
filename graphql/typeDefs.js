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
    moviesLiked: [UserMovieConnection]
    moviesSaved: [UserMovieConnection]
    moviesWatched: [UserMovieConnection]
    moviesDisliked: [UserMovieConnection]
  }

  type UserMovieConnection {
    id: ID
    user: [User]
    movie: [Movie]
    title: String
    image: String
    liked: Boolean
    disliked: Boolean
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
    genres: Int
    backdrop: String
    trailers1: String
    trailers2: String
    trailers3: String
    user: [User]
    credits: [Credits]
    watchproviders: [WatchProvider]
  }
  type Genre {
    id: ID!
    name: String
    movies: [Movie]
  }

  type Credits {
    id: ID
    movie: Movie
    cast: String
  }
  type WatchProvider {
    id: ID!
    movie: Movie
    providers: String
    providerId: Int
  }

  # Top level
  type Query {
    allMovies(take: Int, skip: Int, myCursor: Int): [Movie]
    userMovies: [UserMovieConnection]
    watchedMovies: [UserMovieConnection]
    savedMovies: [UserMovieConnection]
    likedMovies: [UserMovieConnection]
    dislikedMovies: [UserMovieConnection]
    userMovieRecommendations(take: Int, skip: Int, myCursor: Int): [Movie]
    providerMovieQuery(
      take: Int
      skip: Int
      myCursor: Int
      providerId: Int
    ): [Movie]
    lastMovie: Movie
    movie(movieId: ID!): Movie
    user(userId: ID!): User
    verifyUser: User
    userMovieConnection(movieId: ID!): Movie
    getCast(movieId: ID): Credits
    getProviders(movieId: ID!): Movie
    movieLength: Int!
    filterLength(providerId: Int!): Int!
  }
  type Mutation {
    signupUser(signupInput: SignupInput): User!
    signinUser(email: String!, password: String!): User!
    updateUser(
      firstname: String
      lastname: String
      username: String
      email: String
    ): User!
    addMovieToUser(
      movieId: ID
      liked: Boolean
      disliked: Boolean
      saved: Boolean
      watched: Boolean
    ): User!
    checkCurrentUser: User!
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
