import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { Star } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/testimonial.css';

const testimonials = [
  {
    client: 'Gatheron',
    text: "Digital Move Up's innovative strategies revolutionized our online presence. Their expertise in web development and digital marketing helped us reach new heights in customer engagement.",
    rating: 5,
  },
  {
    client: 'Istekana',
    text: "Working with Digital Move Up was a game-changer for our brand. Their SEO optimization and content creation services significantly boosted our organic traffic and conversions.",
    rating: 5,
  },
  {
    client: 'Adventure Club',
    text: "The team at Digital Move Up truly understands the essence of adventure. Their branding and social media marketing efforts perfectly captured our spirit and attracted a wider audience.",
    rating: 5,
  },
  {
    client: 'Medori',
    text: "Digital Move Up's PPC campaigns delivered measurable results beyond our expectations. Their data-driven approach and creative strategies significantly improved our ROI.",
    rating: 5,
  },
];

const TestimonialCard = ({ client, text, rating }) => (
  <motion.div
    className="testimonial-card"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3>{client}</h3>
    <p>"{text}"</p>
    <div className="rating">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="star" />
      ))}
    </div>
  </motion.div>
);

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="testimonial-section">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Trusted by Businesses Globally
      </motion.h2>
      <div className="testimonial-container">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;

