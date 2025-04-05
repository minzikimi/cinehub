import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { motion, AnimatePresence,useScroll } from 'framer-motion';
import { useNavigate, useMatch } from 'react-router-dom';

const Wrapper = styled(motion.div)`
  display: grid;

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
  padding: 10px;
  background-color: tomato;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 18px;
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

`



const ShowList = ({ queryKey, queryFn, pathPrefix }) => {
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
  });


  const navigate = useNavigate();
  const handleCardClick = (showId) => {
    console.log("Navigating to show id", showId);
    navigate(`/${pathPrefix}/${showId}`);
  };
  const showMatch = useMatch(`/${pathPrefix}/:showId`);

  const handleOverlayClick = () =>navigate(-1);
//   const {scrollY}=useScroll();
//   const modalTop = useTransform(scrollY, (value) => value + 100);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }

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
          transition={{ type: "tween" }}
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
         <Overlay
             onClick={handleOverlayClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }} 
            />
            <motion.div
                layoutId={showMatch.params.showId}
                style={{
                position: "absolute",
                width: "40vw",
                height: "auto",
                backgroundColor: "red", 
                left: 0,
                right: 0,
                position:"fixed",
                margin: "0 auto",
                zIndex: 100,
                }}
            
            >
            <h2>Show Details</h2>
            <p>This is where the detailed info of the show will appear.</p>
          </motion.div>
        </>
        
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
};

export default ShowList;
