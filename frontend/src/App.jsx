import "./App.css";
import PostFull from "./components/Post/PostFull";
import { Home, Login, SignUp, Error, CreatePost } from "./components/index";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post" element={<PostFull />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
