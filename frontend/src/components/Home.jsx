import React from "react";
import { Navbar, Post, Footer } from "./index";
import { useSelector } from "react-redux";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Navbar />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
