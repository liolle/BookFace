import React, { useState, useEffect, useRef, FC } from "react";
import { ProfileInfo } from "../../utils/typess";

const Followings = ({ profileInfo }: {
    profileInfo:ProfileInfo,
}) => {


    return (
        <div className=' flex gap-4 justify-between'>
            <button className=' hover:text-green-700' type='button' > {profileInfo.followers} followers </button >
            <span> - </span>
            <button className=' hover:text-green-700' type='button' > {profileInfo.following} following </button >
        </div>
    )
};

export default Followings;

