import Router from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import {
  addcomment,
  createPost,
  getAllPost,
} from "../controllers/postController.js";

const featureRouter = Router();

featureRouter.route("/createpost").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createPost
);

featureRouter.route("/getallpost").post(getAllPost);

// featureRouter.route("/getpost/:postId").post(getAPostById);
featureRouter.route("/addcomment").post(addcomment);

export default featureRouter;
