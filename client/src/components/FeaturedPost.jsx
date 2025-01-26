import React, { useEffect, useState } from "react"
import Post from "../common/routes/post"

const FeaturedPost = () => {
   const [blogs, setblogs] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleContent = () => {
    setIsExpanded(!isExpanded)
  }

  const fetchData = async () => {
    try {
      const response = await Post("/last", {
        verif: true,
      });
      if (response.data.blog) {
        setblogs(response.data.blog);
        console.log(response.data.blog)
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
    <div className="featured-post-section">
      <div className="container">
        <h2>Featured Post</h2>
        <div className="featured-post">
          <img src={blogs.image} alt={blogs.title} className="featured-post-image" />
          <div className="featured-post-content">
            <h3>{blogs.title}</h3>
            <div className="blog-post-content">
              <p>
                {blogs.tag}
              </p>
              
              <div className={`hidden-content ${isExpanded ? "visible" : ""}`}>
                <p>
                {blogs.description}
                </p>
                
              </div>
            </div>
            <div className="featured-post-meta">
              <span></span>
            </div>
            <button onClick={toggleContent} className="read-more-button">
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedPost

