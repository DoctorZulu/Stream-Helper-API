import db from "../utils/generatePrisma.js";
import Users from "../data/users.js";
const anotherOne = () => {
  Users.forEach((entry) => {
    const seedDataBase = async () => {
      let newUser = await db.user.create({
        data: {
          id: entry[0],
          firstname: entry[1],
          lastname: entry[2],
          username: entry[3],
          email: entry[4],
          password: entry[5],
        },
      });
      return newUser;
    };
    seedDataBase();
  });
};
export default anotherOne;
