import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const userId = useSelector((state) => state.auth.userData._id);
  // Handler for handling image selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      setPreviewImage(URL.createObjectURL(selectedImage));
    }
  };

  // Handler for submitting the post
  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("discription", discription);
    formData.append("image", image);
    formData.append("_id", userId);
    console.log(formData);
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8080/api/v1/user/createpost",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for FormData
        },
      }
    );
    console.log(response);
    // Add your logic for submitting the post (e.g., API call, dispatch to Redux, etc.)
    console.log("Post submitted:", { title, discription, image });
    console.log(response.data.success);
    if (response.data.success) {
      navigate("/");
    }
    // Reset form fields
    setTitle("");
    setDiscription("");
    setImage("");
    setPreviewImage(null);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="discription"
            className="block text-sm font-medium text-gray-600"
          >
            Discription
          </label>
          <textarea
            id="discription"
            name="discription"
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {previewImage && (
          <div className="mb-4">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full h-auto rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
