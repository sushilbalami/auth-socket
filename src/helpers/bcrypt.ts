import bcrypt from "bcrypt";

export const hash = async (password: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
