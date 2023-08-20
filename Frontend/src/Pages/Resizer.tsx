import React, { useEffect } from 'react';
import { useState } from 'react';

import BottomNavigationBar from '../Components/Navigation/BottomNavigationBar';
import SideBar from '../Components/Navigation/SideBar';

const Resizer = ({
    children,
}: {
    children: React.ReactNode
}) => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => { setIsMobile(window.innerWidth <= 768); };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className=' flex flex-col flex-1 md:flex-row  h-screen bg-main-background bg-cover' >

            {
                !isMobile && <SideBar children={undefined} />
            }

            <div className=' flex-1' >
                {children}
            </div>

            {
                isMobile && <BottomNavigationBar children={undefined} />
            }

        </div>



    );
}

export default Resizer;