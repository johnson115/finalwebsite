import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { DollarSign, ThumbsUp, TrendingUp } from 'lucide-react';
import '../styles/portfolio.css';

const portfolioItems = [
  { 
    id: 1, 
    title: 'Gatheron Restaurant Dubai', 
    category: 'Web Design & Development',
    description: 'Complete digital transformation for Dubai\'s well-known restaurant'
  },
  { 
    id: 2, 
    title: 'Record-Breaking Social Campaign', 
    category: 'Social Media Marketing',
    description: '500K+ reach with viral content strategy'
  },
  { 
    id: 3, 
    title: 'Best Post Performance', 
    category: 'Content Marketing',
    description: 'Achieved 300% engagement increase'
  },
  { 
    id: 4, 
    title: 'Brand Identity Design', 
    category: 'Branding',
    description: 'Complete brand overhaul and identity design'
  },
  { 
    id: 5, 
    title: 'SEO Success Story', 
    category: 'Digital Marketing',
    description: 'First page rankings for competitive keywords'
  },
  { 
    id: 6, 
    title: 'Social Media Management', 
    category: 'Community Management',
    description: 'Ongoing social media success strategy'
  },
];

const FloatingIcons = ()  => {
  return (
    <div className="floating-icons">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-icon"
          initial={{ y: '100vh', x: Math.random() * 100 - 50 }}
          animate={{ 
            y: '-100vh',
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
        >
          {i % 2 === 0 ? 
            <DollarSign className="icon dollar" /> : 
            <ThumbsUp className="icon like" />
          }
        </motion.div>
      ))}
    </div>
  );
};

const SuccessGraph = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  
  return (
    <div className="success-graph">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M0,80 L20,70 L40,75 L60,45 L80,35 L100,20"
          stroke="#00CBA9"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength }}
        />
        <motion.path
          d="M0,80 L20,70 L40,75 L60,45 L80,35 L100,20"
          stroke="rgba(0, 203, 169, 0.2)"
          strokeWidth="4"
          fill="none"
        />
      </svg>
      <motion.div 
        className="graph-indicator"
        style={{ 
          x: useTransform(pathLength, [0, 1], ['0%', '100%']),
          y: useTransform(pathLength, [0, 1], ['80%', '20%'])
        }}
      >
        <TrendingUp className="indicator-icon" />
      </motion.div>
    </div>
  );
};

const PortfolioItem = ({ title, category, description, index }) => {
  const [refs, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={refs}
      className="portfolio-item"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="portfolio-item-content">
        <h3>{title}</h3>
        <span className="category">{category}</span>
        <p>{description}</p>
        <div className="portfolio-item-image">
          <div className="placeholder-image">Image Placeholder</div>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = React.forwardRef((props , ref) => {
  const [referance, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="portfolio-section">
      <FloatingIcons />
      <SuccessGraph />
      <div className="container">
        <motion.div
          ref={referance}
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2>Our Work Speaks for Itself</h2>
          <p>Transforming visions into digital success stories</p>
        </motion.div>
        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <PortfolioItem key={item.id} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Portfolio;

