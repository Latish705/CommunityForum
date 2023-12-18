import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  register
);

router.post("/login", login);

export default router;
