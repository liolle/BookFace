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


const Loading = () => {

    const [isMobile, setIsMobile] = useState(false);

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
        <div className=' flex-1 flex flex-col md:flex-row  bg-main-background bg-cover min-h-screen'>

            {
                !isMobile && <SideBar children={undefined} />
            }

            <div className=' flex-1 flex justify-center items-center'>
                <SPIN1 />
            </div>

            {
                isMobile && <BottomNavigationBar children={undefined} />
            }


        </div>



    );
}



export default Loading;