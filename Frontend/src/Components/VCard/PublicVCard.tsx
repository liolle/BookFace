import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type VCardProps = {
  tag: string,
  username: string,
  followers: number,
  following: number,
  avatar:string
};

type ResponseMsg = {
  status: number,
  message: string,
  content: object | []
}


const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"

const getProfile = async (u_tag = "")=>{
  let url = `${DEVELOP}/profiles/${u_tag}`

  let options = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("VAToken") || ""}`,
        'accept': 'application/json',
        'Content-Type': 'application/json',
    }
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


const PublicVCard= ({vCardRerender,u_tag}:{vCardRerender:number,u_tag:string}) => {


  const [profile,setProfile] = useState<VCardProps>() 

  useEffect(()=>{

    getProfile(u_tag)
    .then(data=>{
      
      let {

        tag,
        avatar,
        email,
        username,
        followers,
        follows,
        status,
        banner,
        created_at,

      } = data.content as {
        tag :string,
        avatar : string,
        email : string,
        username : string,
        followers : number,
        follows : number,
        status : number,
        banner : number,
        created_at : string,
      }

      let card:VCardProps = {
        tag: tag,
        username: username||"",
        followers: followers,
        following: follows,
        avatar: avatar || "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
      }

      setProfile(card)
      
    })
    .catch(err=>console.log())

  },[vCardRerender])  

  return (
    <div className=" rounded-md overflow-hidden shadow-md bg-white">
      <div className="bg-green-700 h-28 flex justify-center items-center">
        <div className="h-28 flex items-center mt-12 z-30">
          <img
            src={profile? profile.avatar : ""}
            alt=""
            width={150}
            height={150}
            className="bg-white border-1 border-black rounded-full "
          />
        </div>
      </div>
      <div className="text-center py-6 mt-5">
        <h2 className="text-2xl font-bold text-green-800 select-none">{profile? profile.tag : ""}</h2>
      </div>
      <div className="flex justify-between px-6 py-4 border-t border-gray-200 select-none">
        <div >
          <p className="text-gray-600 font-medium select-none">{profile? profile.followers : 0}</p>
          <p className=" font-semibold text-green-600 hover:text-green-900 cursor-pointer">Followers</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium select-none">{profile? profile.following : 0}</p>
          <p className=" font-semibold text-green-600 hover:text-green-900 cursor-pointer">Following</p>
        </div>
      </div>
    </div>
  );
};

export default PublicVCard;

