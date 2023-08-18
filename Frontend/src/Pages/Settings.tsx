import React, { useEffect } from 'react';
import { useState } from 'react';
// import PostData from "../Components/Publication/PostData";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";
import classNames from 'classnames';
import Publication from '../Components/Publication/Publication';
import SideBarStat from '../Components/SideBar/SideBarStat';

import GreenWave2 from '../images/GreenWave2.jpg'
import BottomNavigationBar from '../Components/Navigation/BottomNavigationBar';
import SideBar from '../Components/Navigation/SideBar';
import VCard from '../Components/Cards/VCard';
import Feed from '../Components/Publication/Feed';
import { FeedType } from '../utils/typess';
import { SPIN1 } from '../Components/Loading/Spinner';

// interface ProfileCardProps {
//     data: PostData;
//   }

type buttonProps = {
    text: string,
    activeButton: string,
    setActiveButton: React.Dispatch<React.SetStateAction<string>>
}

const S_BUTTON = ({ text, activeButton, setActiveButton }: buttonProps) => {

    let font_size = text == activeButton ? 'font-bold' : 'font-light '
    let color = text == activeButton ? 'text-green-700' : 'text-neutral-700'
    let border_bottom = text == activeButton ? ' border-b-4 rounded-b-sm border-green-700' : ''

    return (
        <button className={`flex justify-center items-center h-[75%] ${color} ${font_size}
        select-none cursor-pointer rounded-t-md p-2 ${border_bottom}`}
            onClick={() => setActiveButton(text)}>
            {text}
        </button>
    )
}

const Settings = () => {

    const [active, setActive] = useState(0);

    const [post, setPost] = useState('');
    const [post1, setPost1] = useState<null | React.ReactNode>(null);
    const [post2, setPost2] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [rerender_feed_VCard, setRerenderFeedVCard] = useState(0)
    const [activeButton, setActiveButton] = useState('Bookmarks')
    const [rerender_feed, setRerenderFeed] = useState(0)
    const [loading, setLoading] = useState(true);
    const [reRender, setRerender] = useState(0)

    const backgroundImageStyle = {
        backgroundImage: `url("${GreenWave2}")`,
        backgroundSize: 'cover',

    };

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
        <div className=' flex flex-col flex-1 md:flex-row  min-h-screen' style={backgroundImageStyle}>

            {
                !isMobile && <SideBar children={undefined} />

            }

            <div className=' flex-1 flex justify-center items-center'>
            

            </div>



            {
                isMobile && <BottomNavigationBar children={undefined} />

            }


        </div>



    );
}



export default Settings;