import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/portfolio.css';

const portfolioItems = [
  { id: 1, title: 'Web Development Project', category: 'Web Design' },
  { id: 2, title: 'Social Media Campaign', category: 'Marketing' },
  { id: 3, title: 'E-commerce Platform', category: 'Web Development' },
  { id: 4, title: 'Brand Identity Design', category: 'Branding' },
  { id: 5, title: 'SEO Optimization', category: 'Digital Marketing' },
  { id: 6, title: 'Mobile App UI/UX', category: 'App Design' },
];

const PortfolioItem = ({ title, category, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="portfolio-item"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="portfolio-item-content">
        <h3>{title}</h3>
        <p>{category}</p>
        <div className="portfolio-item-image">
          {/* Placeholder for screenshot */}
          <div className="placeholder-image">Image Placeholder</div>
        </div>
      </div>
    </motion.div>
  );
};

const SuccessArrow = () => {
  const { scrollYProgress } = useScroll();
  const arrowHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="success-arrow">
      <motion.div
        className="arrow-fill"
        style={{ height: arrowHeight }}
      />
    </div>
  );
};

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="portfolio-section">
      <SuccessArrow />
      <div className="container">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Our Work Speaks for Itself
        </motion.h2>
        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <PortfolioItem key={item.id} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
