// Post.jsx

import React from "react";
import { Link } from "react-router-dom";

const Post = ({ id, title, description, image, descriptionClass = "" }) => {
  return (
    <div className="bg-white p-4 mb-8 rounded-md shadow-md">
      <div className="border-b border-gray-200 pb-4">
        <div className="flex">
          <div className="flex-1">
            <Link
              to={`/post/:postId=${id}`}
              className="block font-body text-lg font-semibold text-primary transition-colors hover:text-green-800 hover:text-secondary"
            >
              {title}
            </Link>
            <p
              className={`block font-body text-sm font-semibold text-primary transition-colors hover:text-green-800 hover:text-secondary ${
                descriptionClass ? descriptionClass : "text-gray-700"
              }`}
            >
              {description}
            </p>
          </div>
          {image && (
            <img
              src={image}
              alt={title}
              className="h-24 mt-4 ml-4 rounded-md shadow-md float-right"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
