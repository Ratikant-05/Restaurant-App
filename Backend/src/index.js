import express from "express";
import mongoose from "mongoose";
import loginRouter from "./routers/login.router.js";
import adminRouter from "./routers/admin.router.js";
import restaurantRouter from "./routers/restaurant.router.js";
import cartRouter from "./routers/cart.router.js";
import userRouter from "./routers/user.router.js";
import foodRouter from "./routers/food.route.js";
import paymentRouter from "./routers/payment.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();
const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"))
);
// routes
app.use("/auth", loginRouter);
app.use("/food", foodRouter);
app.use("/admin", adminRouter);
app.use("/api", restaurantRouter);
app.use("/cart", cartRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.port;
mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    maxPoolSize: 10,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("listening at port", PORT);
    });
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });
