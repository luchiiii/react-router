import { useGetAllBlogsMutation } from "../../lib/blogsApi/blogApis";
import { useEffect } from "react";
import BlogCard from "./BlogCard";

const AllBlogs = () => {
  //initialize rtk query hook
  const [getAllBlogs, { isError, isSuccess, error, data, isLoading}] = useGetAllBlogsMutation();

  console.log(data);

  useEffect(() => {
    getAllBlogs();
  }, []);


  return (
    <section className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        <BlogCard />
      </div>
    </section>
  );
};

export default AllBlogs;
