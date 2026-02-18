import jwt from "jsonwebtoken";
import env from "../config/env.js";

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES }
  );
};

export default generateToken;