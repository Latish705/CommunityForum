import React from "react";

const Post = () => {
  return (
    <div className="bg-white p-4 mb-8 rounded-md shadow-md">
      <div className="border-b border-gray-200 pb-4">
        <span className="mb-2 inline-block rounded-full bg-green-200 px-2 py-1 font-body text-sm text-green-800">
          category
        </span>
        <a
          href="/post"
          className="block font-body text-lg font-semibold text-primary transition-colors hover:text-green-800 hover:text-secondary"
        >
          Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies
        </a>
        <div className="flex items-center pt-4">
          <p className="pr-2 font-body font-light text-primary text-gray-800">
            July 19, 2020
          </p>
          <span className="font-body text-grey text-gray-800">//</span>
          <p className="pl-2 font-body font-light text-primary text-gray-800">
            4 min read
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
