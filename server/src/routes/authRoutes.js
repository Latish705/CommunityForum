import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { createPost } from "../controllers/postController.js";

const authRouter = Router();

authRouter.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  register
);

authRouter.post("/login", login);

export default authRouter;
