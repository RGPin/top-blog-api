import express from "express";
import userRouter from "./routes/userRouter.js";
import editorRouter from "./routes/editorRouter.js";
import authRouter from "./routes/authRouter.js";
import type { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send(`Haru warudo, ${process.env.TEST}`));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});
app.use("/api/user", userRouter);
app.use("/api/editor", editorRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Listening to port ${PORT}....`);
});
