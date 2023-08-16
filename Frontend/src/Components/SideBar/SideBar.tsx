import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import {FaHome, FaUser} from 'react-icons/fa' 
import { ResponseMsg } from '../../utils/typess';
import { toast } from 'react-toastify';
import { IoExitOutline } from "react-icons/io5";
import React from 'react';

const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"

const fetchDisconnect = ()=>{
  let url = `${PRODUCTION}/logout`

  let options = {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("VAToken") || ""}`,
        'accept': 'application/json',
        'Content-Type': 'application/json',
    },
    
}
  
  return new Promise<ResponseMsg>(async (resolve, reject) => {

    try {

      let response = await fetch(url,options)
      let data:ResponseMsg = await response.json()

      resolve(data) 
      
    } catch (err) {
      resolve({
        status:404,
        message:"System error",
        content: {err}
      }) 
    }
    
  })
}

const SideBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const navHome = ()=>{
    navigate("/Home",{replace:true})
  }

  const navProfile = ()=>{
    navigate("/Profile",{replace:true})
  }

  const navDisconnect = ()=>{

    fetchDisconnect()
    .then((response)=>{
      if (response.status == 100){
        navigate("/Login",{replace:true})
      }
      else{
        toast.error("Error", {
          position: "top-center",
          hideProgressBar:true,
          pauseOnHover:true,
          autoClose: 5000
        })
      }

    })
    .catch(()=>{
      toast.error("Error", {
        position: "top-center",
        hideProgressBar:true,
        pauseOnHover:true,
        autoClose: 5000
      })

    })

  }

  return (
    <div className=" min-h-screen ">
      <div className=" h-full  bg-green-700 text-white py-8 px-4 ">
        <div className=" flex justify-between gap-4 items-center mb-8 select-none">
          {isOpen&&<h1 className='text-xl font-bold'>PHYSYS</h1>}
          <div className=' cursor-pointer'> <FaBars onClick={toggle} /></div>
        </div >

        <div className=' flex flex-col gap-4'>
          {isOpen?<p onClick={()=>navHome()} className=' cursor-pointer select-none font-bold hover:text-green-900'>Home</p>:<FaHome onClick={()=>navHome()} className=' cursor-pointer select-none font-bold hover:text-green-900'></FaHome>}
          {isOpen?<p onClick={()=>navProfile()} className=' cursor-pointer select-none font-bold hover:text-green-900'>Profile</p>:<FaUser onClick={()=>navProfile()} className=' cursor-pointer select-none font-bold hover:text-green-900'></FaUser>}
          {isOpen?<p onClick={()=>navDisconnect()} className=' cursor-pointer select-none font-bold hover:text-green-900'>Disconnect</p>:<IoExitOutline onClick={()=>navDisconnect()} className=' cursor-pointer select-none font-bold hover:text-green-900'></IoExitOutline>}
        </div>
      </div>
    </div>
  );
};

export default SideBar;


