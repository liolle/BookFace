import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import { ResponseMsg } from '../../utils/typess';
import { toast } from 'react-toastify';
import { IoExitOutline } from "react-icons/io5";
import { fetchDisconnect } from '../../utils/library';



const BottomNavigationBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const navHome = () => {
    navigate("/Home", { replace: true })
    window.location.reload();
  }

  const navProfile = () => {
    navigate("/Profile", { replace: true })
    window.location.reload();
  }

  const navDisconnect = () => {
    fetchDisconnect()
      .then((response) => {
        if (response.status == 100) {
          navigate("/Login", { replace: true })
        }
        else {
          toast.error("Error", {
            position: "top-center",
            hideProgressBar: true,
            pauseOnHover: true,
            autoClose: 5000
          })
        }

      })
      .catch(() => {
        toast.error("Error", {
          position: "top-center",
          hideProgressBar: true,
          pauseOnHover: true,
          autoClose: 5000
        })

      })

  }

  return (
    <div className=" sticky bottom-0 w-full z-50 lg:hidden bg-green-700 text-white py-1 px-2">
      <div className="flex gap-8 p-2 justify-center">
        <div className=' flex flex-col items-center cursor-pointer select-none font-bold hover:text-green-900'>
          <FaHome onClick={() => navHome()} className=' h-6  w-6 '></FaHome>
          Home
        </div>

        <div className=' flex flex-col items-center cursor-pointer select-none font-bold hover:text-green-900'>
          <FaUser onClick={() => navProfile()} className=' h-6  w-6 '></FaUser>
          Profile
        </div>
        <div className=' flex flex-col items-center cursor-pointer select-none font-bold hover:text-green-900'>
          <IoExitOutline onClick={() => navDisconnect()} className=' h-6  w-6 '></IoExitOutline>
          Disconnect
        </div>
      </div>
      <main className="ml-0 sm:ml-50">{children}</main>
    </div>
  );
};

export default BottomNavigationBar;

