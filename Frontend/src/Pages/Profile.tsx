import React, { useEffect, useState } from 'react';
import ProfileCard from '../Components/Cards/ProfileCard';
import { ProfileInfo } from '../utils/typess';
import { getProfile } from '../utils/library';
import { Toaster } from 'react-hot-toast';
import { useRef } from 'react';


const Profile = () => {

    return (
        <div className=' flex flex-col p-4' >
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <ProfileCard editable={true} />

        </div>
    );
}

export default Profile;