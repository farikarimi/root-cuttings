import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';

function PageFlip() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Toggle between front and back
  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const pageVariants = {
    front: { rotateY: 0 }, // Front page facing forward
    back: { rotateY: 180 }, // Back page facing forward
  };

  const containerStyles = {
    perspective: 1000, // Adds a 3D effect
    width: '300px',
    height: '400px',
    position: 'relative',
    cursor: 'pointer',
    zIndex: 800,
  };

  const pageStyles = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden', // Hides the opposite side
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div style={containerStyles} onClick={handleFlip}>
      {/* Front Page */}
      <motion.div
        style={{
          ...pageStyles,
          backgroundColor: 'lightblue',
          zIndex: 801,
        }}
        animate={isFlipped ? 'back' : 'front'}
        variants={pageVariants}
        transition={{ duration: 0.8 }}
      >
        Front Page
      </motion.div>

      {/* Back Page */}
      <motion.div
        style={{
          ...pageStyles,
          zIndex: 801,
          backgroundColor: 'lightcoral',
          transform: 'rotateY(180deg)', // Set the back page's initial rotation
        }}
        animate={isFlipped ? 'front' : 'back'}
        variants={pageVariants}
        transition={{ duration: 0.8 }}
      >
        Back Page
      </motion.div>
    </div>
  );
}

export default PageFlip;
