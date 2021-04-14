import { AuthenticationError } from "apollo-server";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const checkAuth = (context) => {
  const authHeader =
    context.req.session.token || context.req.headers.authorization;
  // const authHeader = context.req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    console.log("auth Header", authHeader);
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log("user", user);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid token");
      }
    }
    throw new Error("Invalid Header, check header contents");
  }
  throw new Error("No Auth header found");
};

export default checkAuth;
