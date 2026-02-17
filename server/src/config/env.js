import "dotenv/config";

const env = {
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL,
  COOKIE_EXPIRES: process.env.COOKIE_EXPIRES || 7,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES || "7d",
};

if (!env.MONGODB_URL) {
  throw new Error("❌ MONGODB_URL missing in .env");
}

if (!env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET missing in .env");
}

export default env;
