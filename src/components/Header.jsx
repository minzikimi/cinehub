import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';


const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  margin-top: 3rem;
  padding: 0 20px;
  top: 0;
  height: 80px;
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
  gap:3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;  
    align-items: flex-start;
    width: 100%;
    gap:1rem;
  }
`;

const Menu = styled.div`
  margin-right: 30px;
  cursor: pointer;
  font-size: 3rem;
  font-weight: 600;
  
  color: #fafb06;
  &:hover {
    color: white;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 15px;
    font-size: 2.5rem; 
  }
`;

const Logo = styled.h1`
  font-family: "Londrina Shadow", sans-serif;
  color: #fafb06;
  font-size: 10rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
  flex-grow: 1;
  text-align: center;
  
  &:hover {
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 6rem;  
  }
`;


const Header = () => {
  return (
    <Nav>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        
        <Col gap="10rem">
          <Logo>CineHub</Logo>
        </Col>

        <Col>
          <MenuWrapper>
            <Menu>Popular</Menu>
            <Menu>Now Playing</Menu>
            <Menu>Coming Soon</Menu>
          </MenuWrapper>
        </Col>
      </div>

    </Nav>
  );
};

export default Header;
