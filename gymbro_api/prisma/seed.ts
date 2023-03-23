import bcrypt from "bcrypt";

import db from "../src/utils/db";

const main = async () => {
  const user = await db.user.create({
    data: {
      email: "user001@email.com",
      password: await bcrypt.hash("Gymbro123", 10),
      firstName: "User",
      lastName: "001",
    },
  });

  console.log(user);
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch((error) => console.log(error));
