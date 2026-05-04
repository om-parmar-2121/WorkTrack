import "dotenv/config";

const normalizeOrigin = (url) => (url || "").replace(/\/+$/, "");
const splitOrigins = (value) =>
  (value || "")
    .split(",")
    .map((entry) => normalizeOrigin(entry.trim()))
    .filter(Boolean);

const configuredOrigins = splitOrigins(process.env.CLIENT_URLS);
const fallbackOrigins = splitOrigins(process.env.CLIENT_URL || "http://localhost:5173");
const defaultOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const CLIENT_URLS = Array.from(new Set([...configuredOrigins, ...fallbackOrigins, ...defaultOrigins]));

const env = {
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL,
  COOKIE_EXPIRES: process.env.COOKIE_EXPIRES || 7,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES || "7d",
  CLIENT_URL: CLIENT_URLS[0],
  CLIENT_URLS,
};

if (!env.MONGODB_URL) {
  throw new Error("❌ MONGODB_URL missing in .env");
}

if (!env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET missing in .env");
}

export default env;
