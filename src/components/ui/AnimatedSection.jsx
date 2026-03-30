import PropTypes from 'prop-types';
import { motion, useReducedMotion } from 'framer-motion';

const MotionSection = motion.section;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

/**
 * Scroll-triggered section with framer-motion; respects prefers-reduced-motion.
 */
export function AnimatedSection({
  children,
  className,
  id,
  variants: customVariants,
}) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? reducedVariants : (customVariants ?? fadeUp);

  return (
    <MotionSection
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={variants}
    >
      {children}
    </MotionSection>
  );
}

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  variants: PropTypes.object,
};
