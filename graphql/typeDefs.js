import { gql, PubSub } from "apollo-server";

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
      user: User
      movie: Movie

  }
  type Mutation {
  
  }
  input SignupInput {

  }
   type Subscription {
 
  }
`;

export default typeDefs;
