import { useEffect, useState } from 'react'
import Followings from '../Components/Followings/Followings'
import PostCard from "../Components/Postcard/Postcard"
import VCard from "../Components/VCard/VCard"
import SideBar from '../Components/SideBar/SideBar'
import NatureCard from '../Components/GalleryCard/GalleryCard'
import GreenWave2 from '../images/GreenWave2.jpg'
import BottomNavigationBar from '../Components/BottomNavigationBar/BottomNavigationBar'
import Feed from '../Components/Publication/Feed'
import React from 'react'

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [rerender_feed, setRerenderFeed] = useState(0)
  const [rerender_feed_VCard, setRerenderFeedVCard] = useState(0)

  const feedFRender = () => {
    setRerenderFeed(Math.random)
  }

  // Using window size to handle side bar & bottom bar visibility
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (

    <div className=' flex flex-col md:flex-row bg-main-background bg-cover ' >
      {!isMobile && <SideBar children={undefined} />}
      <div className=' flex flex-col md:flex-[0_1_300px] gap-4  p-4'>
        <VCard vCardRerender={rerender_feed_VCard} />
        <Followings vCardRerender={setRerenderFeedVCard} />
        <NatureCard />
      </div>
      <div className=' flex flex-col gap-4 md:flex-1  p-4  '>

        <div className=' flex-1'>
          <PostCard profilePictureUrl="" feedFRender={feedFRender} />
        </div>
        <Feed type={0} rerender_feed={rerender_feed} isReg={false} ></Feed>
      </div>
      {isMobile && <BottomNavigationBar children={undefined} />}

    </div>
  )
}
export default Home