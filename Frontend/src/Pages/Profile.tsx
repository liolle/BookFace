import React, { useEffect, useState } from 'react';
import ProfileCard from '../Components/Cards/ProfileCard';
import { ProfileInfo } from '../utils/typess';
import { getProfile } from '../utils/library';

const Profile = () => {

    const [profile, setProfile] = useState<ProfileInfo>({
        tag: '@user',
        username: 'name',
        followers: 0,
        following: 0,
        avatar: 'https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg'
    })

    useEffect(() => {

        getProfile()
            .then(data => {

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
                    tag: string,
                    avatar: string,
                    email: string,
                    username: string,
                    followers: number,
                    follows: number,
                    status: number,
                    banner: number,
                    created_at: string,
                }

                setProfile({
                    tag: tag,
                    username: username,
                    followers: followers,
                    following: follows,
                    avatar: avatar
                })



            })
            .catch(err => console.log(err))

    }, [])

    return (
        <div className=' flex flex-col ' >
            <ProfileCard profileInfo={profile} />
        </div>
    );
}

export default Profile;