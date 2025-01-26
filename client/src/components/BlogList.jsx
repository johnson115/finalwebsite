import React, { useEffect, useState } from "react"
import BlogCard from "./BlogCard"
import Post from "../common/routes/post";

const BlogList = () => {
 const [blogs, setblogs] = useState([]);
  const fetchData = async () => {
    try {
      const response = await Post("/allblogs", {
        verif: true,
      });
      if (response.data.blogs) {
        setblogs(response.data.blogs);
      } else {
        console.log("No blogs available.");
        setblogs([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="blog-list-section">
      <div className="container">
        <h2>Latest Posts</h2>
        <div className="blog-list">
          {blogs.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogList

