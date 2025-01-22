import React, { useState } from "react"

const FeaturedPost = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleContent = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="featured-post-section">
      <div className="container">
        <h2>Featured Post</h2>
        <div className="featured-post">
          <img src={require("../media/strategi.jpeg")} alt="Marketing Strategies" className="featured-post-image" />
          <div className="featured-post-content">
            <h3>10 Effective Marketing Strategies for 2023</h3>
            <div className="blog-post-content">
              <p>
                In the ever-evolving world of digital marketing, staying ahead of the curve is crucial for businesses
                looking to thrive in 2023 and beyond. As we navigate through an increasingly connected and
                technology-driven landscape, it's essential to adapt our marketing strategies to meet the changing needs
                and preferences of our target audience.
              </p>
              <p>
                This comprehensive guide will delve into ten of the most effective marketing strategies that are set to
                dominate the industry in 2023. From leveraging artificial intelligence and machine learning to embracing
                the power of video content and influencer partnerships, we'll explore how these cutting-edge tactics can
                help your business stand out in a crowded marketplace.
              </p>
              <div className={`hidden-content ${isExpanded ? "visible" : ""}`}>
                <p>
                  1. Artificial Intelligence and Machine Learning: AI and ML are revolutionizing the way businesses
                  approach marketing. From chatbots that provide instant customer service to predictive analytics that
                  help forecast consumer behavior, these technologies are enabling marketers to create more personalized
                  and efficient campaigns.
                </p>
                <p>
                  2. Video Marketing: With the rise of platforms like TikTok and the continued popularity of YouTube,
                  video content has become an essential part of any marketing strategy. Short-form videos, live streams,
                  and interactive video experiences are all powerful tools for engaging audiences and conveying your
                  brand message.
                </p>
                <p>
                  3. Influencer Marketing: Collaborating with influencers remains a highly effective way to reach new
                  audiences and build trust with potential customers. In 2023, we're seeing a shift towards
                  micro-influencers and long-term partnerships that feel more authentic and genuine.
                </p>
                <p>
                  4. Voice Search Optimization: As voice-activated devices become more prevalent in homes and offices,
                  optimizing your content for voice search is crucial. This means focusing on natural language and
                  long-tail keywords that match how people speak, rather than type.
                </p>
                <p>
                  5. Augmented Reality (AR) Experiences: AR is no longer just for gaming. Brands are using AR to create
                  immersive experiences that allow customers to visualize products in their own space or try on virtual
                  clothing and makeup.
                </p>
              </div>
            </div>
            <div className="featured-post-meta">
              <span>June 15, 2023</span>
              <span>10 min read</span>
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

