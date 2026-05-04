import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.js";
import userRouter from "./routes/user.route.js";
import employeeRouter from "./routes/employee.route.js";
import attendanceRouter from "./routes/attendance.route.js";
import leaveRouter from "./routes/leave.route.js";
import notificationRouter from "./routes/notification.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (env.CLIENT_URLS.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRouter);
app.use("/employee", employeeRouter);
app.use("/attendance", attendanceRouter);
app.use("/leave", leaveRouter);
app.use("/notification", notificationRouter);

app.use(errorMiddleware);

export default app;