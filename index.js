import express from "express";
import dEnv from "dotenv";
import mongoose from "mongoose";
import multer from 'multer'
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
import isAdmin from "./utils/isAdmin.js";
import { createComent, deleteComent, getAllComentsForOnePost } from "./controllers/ComentsController.js";
import { createComentValidation } from "./validations/comentValidation.js";
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
  const storage = multer.diskStorage({
    destination:(_,__,cb) => {
      cb(null, 'uploads')
    },
    filename:(_,file,cb) => {
      cb(null, file.originalname)
    }
  })
  const upload = multer({storage})

app.post('/upload',checkAuth,upload.single('image'),(req,res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})
app.use('/uploads',express.static('uploads'))
app.post("/auth/register", registerValidation, validationResultMidleware, registerController);
app.post("/auth/login", loginValidation, loginController);
app.get("/auth/me", checkAuth, authMeControler);

app.get("/posts", getAllPostsController);
app.get("/post/:id", getOnePostController);
app.post("/posts", checkAuth,isAdmin, postCreateValidation, validationResultMidleware, createPostController);
app.delete("/post/:id", checkAuth,isAdmin, deletePostController);
app.patch("/post/:id", checkAuth,isAdmin,postCreateValidation,validationResultMidleware, updatePostController);

app.post("/coment/:id",checkAuth,createComentValidation,createComent)
app.delete("/coment/:id",checkAuth,deleteComent)
app.get("/coments/:id",getAllComentsForOnePost)
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("serverOK");
});
