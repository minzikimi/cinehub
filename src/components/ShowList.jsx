import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useMatch } from 'react-router-dom';

const Wrapper = styled(motion.div)`
  display: grid;
  gap:2rem;
  grid-template-columns: repeat(4, 1fr);
  margin: 50px 30px;
  justify-items: center;
  font-family: "42dot Sans", sans-serif;

  @media (max-width: 768px) {
    grid-template-columns:repeat(2,1fr);
  }
`;

const Card = styled(motion.div)`
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease;
  width: 80%; 
  min-height: 300px;
  cursor: pointer;


  img {
    width: 100%;
    object-fit: contain;
    border-radius: 10px;
  }

  h3 {
    margin-top: 10px;
    font-size: 18px;
  }

  p {
    padding: 10px;
    font-size: 14px;
  }

  &:first-child {
    transform-origin: center left;
  }

  &:nth-child(4n) {
    transform-origin: center right;
  }

  &:hover {
    z-index: 100;
  }
`;

const Info = styled(motion.div)`
  padding-top: 10px;
  background-color: #fafb06;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  border-bottom-left-radius: 10px; 
  border-bottom-right-radius: 10px; 
  h4 {
    text-align: center;
    font-size: 18px;
    color:#213547;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  opacity: 0;
  
  transition: opacity 0.3s ease-in-out;
`;
const Modal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #030303;
  height: 450px;
  z-index: 100;
  display: flex;
  flex-direction: row; 
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  max-width: 800px; 
  border-radius: 10px;

    @media (max-width: 820px) {
    flex-direction: column;
    max-width: 90%;
    height: auto;
    padding: 15px;
  }
`;

const ModalCover = styled.div`
  width: 40%; 
  height: 100%;
  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 10px;

    @media (max-width: 768px) {
    width: 100%;
    height: auto;
    max-width: 100%;
    margin-bottom: 15px;
  }
`;

const ModalContent = styled.div`
  width: 55%;
  color: white;
  padding-left: 20px;


  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0;
  }
`;

const ModalTitle = styled.h2`
  position: relative;
  font-size: 2rem;
  margin-top: 10px;

   @media (max-width: 1082px) {
    font-size: 1.5rem;
  }
`;

const ModalOverview = styled.h3`
  font-weight: 100;
  text-align: left;
  padding: 0 20px;
  margin: 10px 0;

   @media (max-width: 1082px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin:3rem;

   @media (max-width: 1082px) {
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
`;

const Button = styled.button`
  
  color: #213547;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &.add-to-list {
    border:1px solid #fafb06;
    background-color:transparent;
    color:#fafb06;
  }
  &.play{
  background-color: #fafb06;
  }

  @media (max-width: 1082px) {
    font-size: 14px;
  }
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.1,
      type: "tween",
    },
  },
};

const cardVariants = {
    hidden: { opacity: 0 },
    hover: {
      scale: 1.2,
      y: -40,
      transition: {
        delay: 0.2,
        duration: 0.2,
        type: "tween",
      },
    },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
      },
    }),
  };

  const ShowList = ({ queryKey, queryFn, pathPrefix }) => {
    const { data, isLoading, error } = useQuery({
      queryKey,
      queryFn,
    });
    console.log('API Response:', data);
  
    const navigate = useNavigate();
    const handleCardClick = (showId) => {
      console.log('Navigating to show id', showId);
      navigate(`/${pathPrefix}/${showId}`);
    };
    const showMatch = useMatch(`/${pathPrefix}/:showId`);
  
    const handleOverlayClick = () => navigate(-1);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error fetching data</div>;
    }
  
    const clickedShow = showMatch?.params.showId && data.find((show) => show.id === +showMatch.params.showId);
    console.log(clickedShow);

  
    return (
      <Wrapper>
        {data.map((show, index) => (
          <Card
            key={show.id}
            whileHover="hover"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            transition={{ type: 'tween' }}
            onClick={() => handleCardClick(show.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
            />
            <Info variants={infoVariants}>
              <h4>{show.name}</h4>
            </Info>
          </Card>
        ))}
  
        <AnimatePresence>
          {showMatch ? (
            <>
              <Overlay onClick={handleOverlayClick} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }} />
              <Modal layoutId={showMatch.params.showId}>
                {clickedShow ? (
                  <>
                    <ModalCover src={`https://image.tmdb.org/t/p/w500${clickedShow.poster_path}`} />
                    <ModalContent>
                      <ModalTitle>{clickedShow.name}</ModalTitle>
                      <ModalOverview>{clickedShow.overview}</ModalOverview>
  
                      <ButtonGroup>
                        <Button className="play">Play</Button>
                        <Button className="add-to-list">
                          Add to List
                        </Button>
                      </ButtonGroup>
                    </ModalContent>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </Modal>
            </>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    );
  };
  
  export default ShowList;
  