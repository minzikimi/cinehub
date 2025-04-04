// Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`

  color: #ecf0f1;
  padding: 20px;
  text-align: center;
  font-size: 1rem;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterText = styled.p`
  margin: 0;
  padding: 5px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterText>
          &copy; {new Date().getFullYear()} WatchHub. All rights reserved.
        </FooterText>
        <FooterText>
          By MJ
        </FooterText>
       
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
