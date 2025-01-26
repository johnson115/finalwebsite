import React from 'react'
import BlogHero from '../components/BlogHero'
import FeaturedPost from '../components/FeaturedPost'
import BlogList from '../components/BlogList'
import "../styles/blog.css"

const BlogPage = () => {
  
  return (
    <div className="min-h-screen bg-white">
      <BlogHero  text={"blogs"} />
      <FeaturedPost />
      <BlogList />
    </div>
  )
}

export default BlogPage