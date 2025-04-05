import React from 'react'
import { getTopRatedTVShows } from '../api/api'
import ShowList from '../components/ShowList'

const TopRated = () => {
  return (
    <div>

      <ShowList 
          queryKey={['shows', 'airing today']} 
          queryFn={getTopRatedTVShows} 
          pathPrefix="toprated" 
        />
    </div>
  )
}

export default TopRated
