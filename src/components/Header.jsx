import React from 'react';
import styled from 'styled-components';
import {motion, useAnimation,useScroll,useMotionValueEvent} from "framer-motion";
import { useMatch, Link } from 'react-router-dom';
// import popcornIcon from "../assets/popcorn-svgrepo-com.svg"

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fix;
  width: 100%;
  margin-top: 1rem;
  padding: 20px;
  top: 0;
  height: auto;
  font-size: 14px;
  background-color: #83a7bf;
  z-index: 1000;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
    height: auto;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => (props.gap ? props.gap : '0')};
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;  
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  position: relative;

  
  @media (max-width: 1082 px) {
    flex-direction: column;  
    align-items: flex-start;
    width: 100%;
    gap: 1rem;
  }
`;

const Menu = styled.div`
  cursor: pointer;
  font-size: 2rem;
  font-weight: 600;
  color: #fafb06;
  position: relative; 
  &:hover {
    color: #213547;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  ${(props) => props.isActive && `
    color: white;
    font-weight: 700;
  `}
`;

const Logo = styled.h1`
  font-family: "Boldonse", system-ui;
  color: #fafb06;
  font-size: 4rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin:0;
  margin-left:2rem;
  flex-grow: 1;
  text-align: center;
  
  transition: all 0.3s ease;  
  &:hover {
    color: #ffffff;  

    opacity: 0.8;  
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #ecf0f1;
  width: 15px;
  height: 15px;
  border-radius: 50%;

    @media (max-width: 768px) {
    width:5px;
    height:5px;
    bottom:-5px;
  }
`;
const navVariants = {
    top: {
      backgroundColor:" #83a7bf",
    },
    scroll: {
      backgroundColor: "rgb(38, 55, 68)",
      
    },
  };
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
  

const Header = () => {
  const homeMatch = useMatch('/');
  const topRatedMatch = useMatch('/toprated');
  const nowplayingMatch = useMatch('/nowplaying');
  const {scrollY} = useScroll();
  const navAnimation = useAnimation();
    

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
        <Col gap="10rem">
            <LogoWrapper>
            <Logo>WatchHub</Logo>
                {/* <img src={popcornIcon} alt="Popcorn Icon"  style={{ width: "70px", height: "70px", fill: "#fafb06" }} /> */}
       
            </LogoWrapper>
        </Col>

        <Col>
          <MenuWrapper>
    
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Menu >
                Trending
                {homeMatch && <Circle layoutId="circle" />}
              </Menu>
            </Link>

            <Link to="/nowplaying" style={{ textDecoration: 'none' }}>
              <Menu >
                Now Playing
                {nowplayingMatch && <Circle layoutId="circle" />}
              </Menu>
            </Link>

            <Link to="/toprated" style={{ textDecoration: 'none' }}>
              <Menu >
                Top Rated
                {topRatedMatch && <Circle layoutId="circle" />}
              </Menu>
            </Link>
          </MenuWrapper>
        </Col>
      
    </Nav>
  );
};

export default Header;
