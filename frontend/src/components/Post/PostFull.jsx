import React, { useState } from "react";

const Post = () => {
  // Dummy data for post and comments
  const postContent =
    "Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies";
  const comments = [
    { id: 1, text: "Great post!" },
    { id: 2, text: "I learned a lot from this." },
  ];

  // State for new comment input
  const [newComment, setNewComment] = useState("");

  // Handler for adding a new comment
  const addComment = () => {
    // Add your logic to store or display the new comment
    console.log("Adding comment:", newComment);
    // For simplicity, let's just clear the input field
    setNewComment("");
  };

  return (
    <div className="border-b border-gray-300 p-4">
      {/* Post Content */}
      <div>
        <span className="mb-4 inline-block rounded-full bg-green-200 px-2 py-1 font-body text-sm text-green-800">
          category
        </span>
        <p className="block font-body text-lg font-semibold text-gray-800 transition-colors hover:text-green-600">
          {postContent}
        </p>
        <div className="flex items-center pt-2">
          <p className="pr-2 font-body font-light text-gray-600">
            July 19, 2020
          </p>
          <span className="font-body text-gray-600">//</span>
          <p className="pl-2 font-body font-light text-gray-600">4 min read</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Comments</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2 text-gray-600">
              {comment.text}
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <input
            type="text"
            className="border border-gray-300 p-2 w-full"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 ml-2 hover:bg-blue-600"
            onClick={addComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
