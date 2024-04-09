import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { hash } from "../helpers/bcrypt";

const main = async () => {
  AppDataSource.initialize().then(async () => {
    const hashedPassword = await hash("admin");
    const user = User.create({
      username: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    });
    await user.save();
  });
};
main();
