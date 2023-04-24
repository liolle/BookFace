import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaBell, FaBookmark, FaEllipsisV } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import { SidebarData } from '../SideBar/SideBarData';



  const SideBarStat : React.FC<{ children: React.ReactNode }>  = ({children}) => {
    const isDesktopOrLaptop = useMediaQuery({
      query: '(min-device-width: 760px)'
    });
  
    if (isDesktopOrLaptop) {

  return (
    <div className="bg-green-100 text-green-900 h-screen">
      <div className="px-12 py-12">
        <div className="flex justify-between items-center pt-20 mb-10 mr-14"><FaHome />
          <Link to="/Home" className="text-xl font-semibold text-gray-700 hover:text-green-500">Home</Link>
        </div>
        <div className="flex justify-between items-center mb-10 mr-14"><FaUser />
          <Link to="/Profile" className="text-xl font-semibold text-gray-700 hover:text-green-500">Profile</Link>
        </div>
        <div className="flex justify-between items-center mb-10"><FaBell className="inline-block mr-3" />
          <Link to="/Notifications" className="text-xl font-semibold text-gray-700 hover:text-green-500">Notifications</Link>
        </div>
        <div className="flex justify-between items-center mb-10 mr-5"><FaBookmark />
          <Link to="/BookMarks" className="text-xl font-semibold text-gray-700 hover:text-green-500">BookMark</Link>
        </div>
        <div className="flex justify-between items-center mb-10 mr-16"><FaEllipsisV />
          <Link to="/More" className="text-xl font-semibold text-gray-700 hover:text-green-500">More</Link>
        </div>
      </div>
    </div>
  );
} else {
  return (
    <div className="fixed bottom-0 w-full z-50 sm:hidden bg-green-700 text-white py-1 px-2">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">PHYSYS</h1>
        
      </div>
      <div className="flex">
        {SidebarData.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="flex-1 flex flex-col items-center py-2 px-4 text-center hover:bg-green-700 hover:text-white"
            activeClassName="active"
          >
            <div className="text-xl">{item.icon}</div>
            <div className="mt-1 text-xs">{item.title}</div>
          </NavLink>
        ))}
      </div>
      <main className="ml-0 sm:ml-50">{children}</main>
    </div>
  );
 }
}
  
  export default SideBarStat;