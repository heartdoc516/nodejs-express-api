import express from "express";
import morgan from "morgan";
import router from "./router";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "hello world" });
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401);
    res.json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400);
    res.json({ message: "invalid input" });
  } else {
    res.status(500);
    res.json({ message: "oops, that's on us" });
  }
});
export default app;
