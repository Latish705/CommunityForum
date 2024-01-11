import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { createPost } from "../controllers/postController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

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
authRouter.post("/logout", verifyJWT, logout);

export default authRouter;
