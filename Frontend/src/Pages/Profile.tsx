import React, { useEffect, useState } from 'react';
import ProfileCard from '../Components/Cards/ProfileCard';
import { Toaster } from 'react-hot-toast';
import FFeed from '../Components/Followings/FollowFeed';
import { S_BUTTON } from '../Components/Buttons/SButton';


const Profile = () => {

    const [activeButton, setActiveButton] = useState('Followers')

    const [uu_tag, setUutag] = useState("")

    useEffect(() => {

        const VAToken = localStorage.getItem("VAToken");
        if (!VAToken) return
        const [header, payload, signature] = VAToken.split(".");
        const decodedPayload = JSON.parse(atob(payload));

        setUutag(decodedPayload.user_tag)

    }, [])


    return (

        <div className=' flex max-h-[100vh]'>
            <div className=' flex flex-col ' >
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <ProfileCard editable={true} />

            </div>
            <div className=" flex-1 flex flex-col p-3 ">
                <div className=" flex items-end gap-8 flex-[0_1_5%] pl-2 ">
                    <S_BUTTON text="Followers" activeButton={activeButton} setActiveButton={setActiveButton} />
                    <S_BUTTON text="Follows" activeButton={activeButton} setActiveButton={setActiveButton} />

                </div>
                <div className=" flex justify-center flex-[0_1_95%]  rounded-lg overflow-y-scroll">

                    {
                        activeButton == "Followers" && <FFeed user_tag={uu_tag} type='Followers' />
                    }
                    {
                        activeButton == "Follows" && <FFeed user_tag={uu_tag} type='Follows' />
                    }

                </div>
            </div>

        </div>


    );
}

export default Profile;