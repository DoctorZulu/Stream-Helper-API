import express from "express";
import prisma from "@prisma/client";
import cors from "cors";

const app = express();

const db = new prisma.PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty",
});

// Configure
const PORT = process.env.PORT || 4000;

//Middleware

app.use(express.json());
app.use(cors());

//routes incoming requests

app.listen(PORT, function () {
  console.log(`Server is live on ${PORT}`);
});
