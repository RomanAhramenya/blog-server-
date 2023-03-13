import express from "express";
import dEnv from "dotenv";
import mongoose from "mongoose";

import {
  loginValidation,
  registerValidation,
} from "./validations/authValidation.js";
import checkAuth from "./utils/checkAuth.js";
import {
  authMeControler,
  loginController,
  registerController,
} from "./controllers/UserController.js";
import {
  createPostController,
  getAllPostsController,
  getOnePostController,
  deletePostController,
  updatePostController,
} from "./controllers/PostController.js";
import { postCreateValidation } from "./validations/postValidation.js";
import validationResultMidleware from "./utils/expressValidationResultMidleware.js";
const app = express();
app.use(express.json());
dEnv.config();
const PORT = process.env.PORT;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
mongoose
  .connect(MONGOOSE_URL)
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => {
    console.log("DB error", err);
  });
app.post("/auth/register", registerValidation, validationResultMidleware, registerController);
app.post("/auth/login", loginValidation, loginController);
app.get("/auth/me", checkAuth, authMeControler);

app.get("/posts", getAllPostsController);
app.get("/post/:id", getOnePostController);
app.post("/posts", checkAuth, postCreateValidation, validationResultMidleware, createPostController);
app.delete("/post/:id", checkAuth, deletePostController);
app.patch("/post/:id", checkAuth,postCreateValidation,validationResultMidleware, updatePostController);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("serverOK");
});
