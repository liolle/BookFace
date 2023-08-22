import React, { useState, useEffect, useRef, FC } from "react";
import { ProfileInfo } from "../../utils/typess";

const ProfileImage= ({profileInfo,editable,onEdit}:{
    profileInfo:ProfileInfo,
    editable:boolean,
    onEdit:()=>void
}) => {
 

    return (
        <div className='relative'>
                <div className=' flex justify-center items-center h-60 w-60 rounded-full 
            overflow-hidden hover:cursor-pointer border-[2px] border-neutral-700'>
                    <img className=' h-[100%] object-cover'
                        src={profileInfo.avatar} alt="" />
                </div>
                {
                    editable &&
                    <button className=' absolute py-1 px-3 bg-green-700 rounded-md border-neutral-500 
            border-[1px] hover:border-neutral-300 text-neutral-100 bottom-[5%] right-[5%] ' type="button"
                        onClick={() => onEdit()}>
                        Edit
                    </button>
                }

            </div>
    )
};

export default ProfileImage;

