import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px;
  margin: 50px 30px;
  justify-items: center;
  font-family: "42dot Sans", sans-serif;

    @media (max-width: 768px) {
     display:flex;
     flex-direction:column;

  }

`;

const Card = styled(motion.div)`
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease;
  width: 100%; 
  min-height: 400px;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    object-fit: contain;
    border-radius:10px;
  }

  h3 {
    margin-top: 10px;
    font-size: 18px;
  }

  p {
    padding: 10px;
    font-size: 14px;
  }
`;

const ShowList = ({ queryKey, queryFn }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
    },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.3,
        duration: 0.6,
      },
    }),
  };

  return (
    <Wrapper>
      {data.map((show, index) => (
        <Card
          key={show.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={index}
        >
          <img 
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} 
            alt={show.name} 
          />
          <h3>{show.name}</h3>
        </Card>
      ))}
    </Wrapper>
  );
};

export default ShowList;
