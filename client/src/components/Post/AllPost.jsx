// AllPost.jsx

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Post } from "../index";
import { setposts } from "../../store/postSlice";
import { useDispatch } from "react-redux";

const AllPost = () => {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.post(
          "https://devi-community-forum-server.onrender.com/api/v1/user/getallpost"
        );
        console.log(response.data.allPosts);
        setAllPosts(response.data.allPosts);

        dispatch(setposts({ allPosts: response.data.allPosts }));
      } catch (error) {
        console.error("Error fetching all posts:", error);
      }
    };

    fetchAllPosts();
  }, [dispatch]); // Empty dependency array means this effect runs once after the initial render

  // Check if allPosts is still a Promise, and return a loading state if it is
  if (allPosts instanceof Promise) {
    return <div>Loading...</div>;
  }

  // Now allPosts is an array, proceed with rendering
  return (
    <div>
      {allPosts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          description={post.discription}
          image={post.image}
        />
      ))}
    </div>
  );
};

export default AllPost;
