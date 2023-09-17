import { useEffect, useState } from 'react'
import Followings from '../Components/Followings/Followings'
import PostCard from "../Components/Cards/Postcard"
import VCard from "../Components/Cards/VCard"
import NatureCard from '../Components/Cards/GalleryCard'
import Feed from '../Components/Publication/Feed'
import React from 'react'

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [rerender_feed, setRerenderFeed] = useState(0)
  const [rerender_feed_VCard, setRerenderFeedVCard] = useState(0)

  const feedFRender = () => {
    setRerenderFeed(Math.random)
  }

  return (

    <div className=' flex flex-col md:flex-row  justify-center overflow-y-scroll' >
      <div className=' hidden md:flex flex-col gap-4 md:flex-[0_1_25%]  p-4  '>
        <div className=' h-40 w-full bg-green-500 rounded-lg flex justify-center items-center'>
          <span> Put things here </span>
        </div>
      </div>
      <div className=' flex  flex-col gap-4 md:flex-[0_1_50%] p-4 h-screen ' >
        <div className=' flex-1 w-full'>
          <PostCard profilePictureUrl="" feedFRender={feedFRender} />
        </div>
        <Feed type={0} rerender_feed={rerender_feed} isReg={false} ></Feed>
      </div>
      <div className=' hidden md:flex flex-col gap-4 md:flex-[0_1_25%]  p-4  '>
        <div className=' h-40 w-full bg-green-500 rounded-lg flex justify-center items-center'>
          <span> Put things here </span>

        </div>
      </div>

    </div>
  )
}
export default Home