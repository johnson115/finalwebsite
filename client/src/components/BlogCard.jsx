import React, { useState } from "react"

const BlogCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleContent = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="blog-card">
      <img src={post.image || "/placeholder.svg"} alt={post.title} className="blog-card-image" />
      <div className="blog-card-content">
        <h3>{post.title}</h3>
        <div className="blog-post-content">
          <p>{post.excerpt}</p>
          <div className={`hidden-content ${isExpanded ? "visible" : ""}`}>
            {post.fullContent.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="blog-card-meta">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        <button onClick={toggleContent} className="read-more-button">
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  )
}

export default BlogCard

