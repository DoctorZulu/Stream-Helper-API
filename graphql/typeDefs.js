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
    User: [User]
  }

  type Movie {
    id: ID!
    title: String
    original_language: String
    release_date: String
    runetime: Int
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
    allMovies: [Movie]
    user(userId: ID!): User
    movie(movieId: ID!): Movie
  }
  type Mutation {
    signupUser(signupInput: SignupInput): User!
    signinUser(email: String!, password: String!): User!
    updateUser(username: String, firstname: String, email: String): User
    addMovieToUser(movieId: ID!): User!
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
