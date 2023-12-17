import { Router } from "express";
import { register } from "../controllers/authController.js";
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

export default router;
