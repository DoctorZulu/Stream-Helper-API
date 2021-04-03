import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    firstname: String
    lastname: String
    username: String
    email: String!
    token: String
    password: String

    movies: [Movie]
  }

  type Movie {
    id: ID!
    title: String
    original_language: String
    release_date: String
    runetime: Int
    vote_average: Int
    overview: String
    image: String
    genres: [Genre]
    user: User
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
    movie: Movie
  }
  type Mutation {
    signupUser(signupInput: SignupInput): User!
    signinUser(email: String!, pass: String!): User!
    updateUser(username: String, firstname: String, email: String): User
    addMovie(movieId: ID!, userId: ID!): User!
    discardMovie(movieId: ID!, userId: ID!): User!
    saveMovie(movieId: ID!, userId: ID!): User!
  }
  input SignupInput {
    email: String!
    firstname: String!
    lastname: String
    password: String!
  }
`;

export default typeDefs;
