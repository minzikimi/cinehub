import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

const ScrollBackgroundWrapper = styled(motion.div)`
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; 
  transition: background-color 0.3s ease; 
`;

const ScrollBackground = () => {

  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress, 
    [0, 1],  
    ['#83a7bf', 'rgb(38, 55, 68)']  
  );

  return (
    <ScrollBackgroundWrapper style={{ backgroundColor }} />
  );
};

export default ScrollBackground;
