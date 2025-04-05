import React from 'react'
import { getNowPlaying } from '../api/api'
import ShowList from '../components/ShowList'

const NowPlaying = () => {
  return (
    <div>
      <ShowList 
          queryKey={['shows', 'now playing']} 
          queryFn={getNowPlaying} 
          pathPrefix="nowplaying" 
        />
    </div>
  )
}

export default NowPlaying
