import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BlogsPage from "../pages/BlogsPage.js";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={<h1 style={{ marginTop: "100px" }}>Page Not Found</h1>}
      />
      <Route path="/" element={<HomePage />} />
      <Route path="/blogs" element={<BlogsPage />} />
    </Routes>
  );
};

export default AppRoutes;
