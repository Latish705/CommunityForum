import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";

const Post = () => {
  const { postId } = useParams();
  const postState = useSelector((state) => state.post.allPosts);
  const clickedPostId = postId.split("=")[1];
  const currentPost =
    postState.find((post) => post._id === clickedPostId) || {};

  // Dummy data for post and comments
  const postContent = currentPost.title || "Loading...";
  const postImage = currentPost.image || "";
  const postComments = currentPost.comments || [];

  // State for comments
  const [comments, setComments] = useState(postComments);

  // State for new comment input
  const [newComment, setNewComment] = useState("");

  // Handler for adding a new comment
  const addComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/addcomment",
        {
          postId: currentPost._id,
          comment: newComment,
          userId: clickedPostId,
        }
      );
      console.log(currentPost._id, clickedPostId);
      console.log(response.data); // Log the response if needed

      // Add the new comment to the comments state
      setComments([...comments, { comment: newComment }]);
      // Clear the input field
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  function convertToSimpleDateTime(timestamp) {
    const date = new Date(timestamp);

    // Get year, month, and day
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();

    // Get hours, minutes, and AM/PM indicator
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Format hours, minutes, and day with leading zeros if needed
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedDay = day < 10 ? `0${day}` : day;

    // Format month with leading zero if needed
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Construct the date and time string with AM/PM
    const simpleDateTime = `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes} ${ampm}`;

    return simpleDateTime;
  }

  return (
    <div className="border-b border-gray-300 p-4">
      {/* Post Content */}
      <div>
        <img
          src={postImage}
          alt="Post Image"
          className="mb-4 rounded-md max-h-96 object-cover w-full"
        />
        <p className="block font-body text-lg font-semibold text-gray-800 transition-colors hover:text-green-600">
          {postContent}
        </p>
        <p className="block font-body text-sm font-semibold text-gray-800 transition-colors hover:text-green-600">
          {postContent}
        </p>
        <div className="flex items-center pt-2">
          <p className="pr-2 font-body font-light text-gray-600">
            {convertToSimpleDateTime(currentPost.createdAt)}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Comments</h2>
        <ul>
          {comments.map((comment) => (
            <li key={nanoid()} className="mb-2 text-gray-600">
              {comment.comment}
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
            className="bg-blue-500 text-white p-2 ml-2 hover:bg-blue-600 my-4"
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
