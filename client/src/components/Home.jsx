import React from "react";
import { Navbar, Post, Footer, AllPost } from "./index";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Navbar />
        <AllPost />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
