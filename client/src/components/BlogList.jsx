import React from "react"
import BlogCard from "./BlogCard"

const BlogList = () => {
  // This array will be replaced with API data in the future
  const blogPosts = [
    {
      id: 1,
      title: "The Power of Social Media Marketing",
      excerpt:
        "Learn how to leverage social media platforms to boost your brand visibility and engage with your audience.",
      fullContent: [
        "In today's digital age, social media has become an indispensable tool for businesses looking to connect with their target audience and build brand awareness. With billions of active users across various platforms, social media offers unparalleled opportunities for businesses to reach, engage, and convert potential customers.",
        "One of the key advantages of social media marketing is its ability to facilitate two-way communication between brands and consumers. Unlike traditional marketing channels, social media allows businesses to interact directly with their audience, respond to queries in real-time, and gather valuable feedback. This level of engagement helps build trust and loyalty, turning casual followers into brand advocates.",
        "To harness the full potential of social media marketing, it's crucial to develop a comprehensive strategy tailored to your business goals and target audience. This involves identifying the most relevant platforms for your brand, creating compelling content that resonates with your followers, and consistently engaging with your community.",
        "Moreover, social media platforms offer sophisticated targeting options, allowing businesses to reach specific demographics, interests, and behaviors. This precision targeting ensures that your marketing efforts are directed towards the most relevant audience, maximizing your return on investment.",
        "As we move forward, the integration of emerging technologies like augmented reality (AR) and artificial intelligence (AI) into social media platforms will open up new avenues for creative marketing campaigns. Brands that stay ahead of these trends and adapt their strategies accordingly will be well-positioned to capitalize on the ever-evolving social media landscape.",
      ],
      date: "June 10, 2023",
      readTime: "8 min read",
      image: require("../media/social.jpg"),
    },
    {
      id: 2,
      title: "Email Marketing Best Practices",
      excerpt: "Discover the dos and don'ts of email marketing to improve your open rates and conversions.",
      fullContent: [
        "Email marketing remains one of the most effective digital marketing strategies, offering a direct line of communication to your audience and an impressive return on investment. However, with inboxes becoming increasingly crowded, it's crucial to follow best practices to ensure your emails stand out and drive results.",
        "First and foremost, building a quality email list is paramount. Focus on organic growth through opt-in forms on your website, social media, and at events. Avoid purchasing email lists, as this can harm your sender reputation and violate data protection regulations like GDPR.",
        "Personalization is key to successful email marketing. Use subscriber data to tailor your content, subject lines, and send times to individual preferences. Segment your list based on factors like demographics, purchase history, or engagement levels to deliver more relevant content to each group.",
        "Craft compelling subject lines that pique curiosity or offer clear value. Keep them concise (around 40 characters) and avoid spam trigger words. Use A/B testing to refine your approach and identify what resonates best with your audience.",
        "Design mobile-responsive emails that look great on all devices. With over 50% of emails now opened on mobile devices, ensuring a seamless mobile experience is crucial for engagement and conversions.",
        "Finally, always include a clear call-to-action (CTA) in your emails. Whether it's to make a purchase, read a blog post, or sign up for an event, your CTA should be prominent and compelling. Use action-oriented language and create a sense of urgency to encourage immediate action.",
      ],
      date: "June 5, 2023",
      readTime: "6 min read",
      image: require("../media/email.jpg"),
    },
    {
      id: 3,
      title: "SEO Techniques for 2023",
      excerpt: "Stay ahead of the curve with these cutting-edge SEO techniques to improve your website's ranking.",
      fullContent: [
        "Search Engine Optimization (SEO) continues to evolve rapidly, with search engines constantly updating their algorithms to provide users with the most relevant and high-quality results. To stay competitive in 2023 and beyond, it's essential to adapt your SEO strategy to these changes and emerging trends.",
        "One of the most significant shifts in SEO is the growing importance of user experience (UX) signals. Google's Core Web Vitals, which measure loading performance, interactivity, and visual stability, have become crucial ranking factors. Optimizing your website's speed, responsiveness, and overall user experience is no longer optional but a necessity for strong SEO performance.",
        "Content relevance and depth continue to be paramount. Search engines are becoming increasingly sophisticated in understanding context and user intent. Focus on creating comprehensive, authoritative content that thoroughly addresses user queries. Implement semantic SEO techniques by using related keywords and topics to provide a holistic coverage of your subject matter.",
        "Voice search optimization is gaining traction as more users adopt smart speakers and voice-activated devices. Optimize for conversational queries by incorporating natural language and question-based keywords into your content. Consider creating FAQ pages that directly answer common voice search queries in your niche.",
        "The rise of zero-click searches, where users find answers directly in the search results without clicking through to a website, necessitates a focus on featured snippets and rich results. Structure your content with clear headings, lists, and tables to increase your chances of appearing in these prominent positions.",
        "Lastly, don't overlook the importance of technical SEO. Ensure your website has a solid foundation with a secure HTTPS connection, a clear site structure, and an XML sitemap. Implement schema markup to help search engines better understand your content and display rich snippets in search results.",
      ],
      date: "May 28, 2023",
      readTime: "12 min read",
      image: require("../media/seo.jpeg"),
    },
  ]

  return (
    <div className="blog-list-section">
      <div className="container">
        <h2>Latest Posts</h2>
        <div className="blog-list">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogList

