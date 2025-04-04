import React from 'react'
import ShowList from "../components/ShowList"
import { getPopularTVShows } from '../api/api'

const Popular = () => {
    return (
      <div>
        {/* <h2>지금 트렌딩!</h2> */}
        <ShowList 
          queryKey={['shows', 'popular']} 
          queryFn={getPopularTVShows} 
        />
      </div>
    );
  };
  
  export default Popular;