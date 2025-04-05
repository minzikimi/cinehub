import React from 'react';
import { getPopularTVShows } from '../api/api';
import ShowList from '../components/ShowList';

const Popular = () => {
  return (
    <div>
      <ShowList 
        queryKey={['shows', 'popular']} 
        queryFn={getPopularTVShows} 
        pathPrefix="popular" 
      />
    </div>
  );
};

export default Popular;
