import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BlogProvider } from "./components/context/BlogContext.jsx";
import Home from "./pages/home/Home.jsx";
import SingleBlog from "./pages/singleblog/SingleBlog.jsx";
import AddBlog from "./pages/addblog/AddBlog.jsx";
import EditBlog from "./pages/editblog/EditBlog.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";

const App = () => {
  return (
    <BlogProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/blogs/:id/edit" element={<EditBlog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </BlogProvider>
  );
};

export default App;
