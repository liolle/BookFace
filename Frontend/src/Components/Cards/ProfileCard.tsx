import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileInfo } from '../../utils/typess';


const ProfileCard = ({ profileInfo }: { profileInfo: ProfileInfo }) => {

    return (
        <div className=" flex flex-col gap-4 p-4 w-fit">

            <div className=' flex justify-center items-center h-60 w-60 rounded-full 
            overflow-hidden hover:cursor-pointer border-[2px] border-neutral-700'>
                <img className=' h-[100%]'
                    src={profileInfo.avatar} alt="Profile picture" />
            </div>
            <div>
                <button className=' hover:text-green-700' type='button' > {profileInfo.tag} </button >
            </div>
            <button className=' bg-green-700 rounded-md border-neutral-500 
            border-[1px] hover:border-neutral-300 text-neutral-100' type="button">
                Edit
            </button>
            <div className=' flex gap-4 justify-between'>
                <button className=' hover:text-green-700' type='button' > {profileInfo.followers} followers </button >
                <span> - </span>
                <button className=' hover:text-green-700' type='button' > {profileInfo.following} following </button >
            </div>

            <div>
                
                <button type='button' className=' text-xs'> https://github/liolle </button>
            </div>

        </div>
    );
};

export default ProfileCard;

