import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileInfo } from '../../utils/typess';
import { ImageValidator, getProfile, multiUpload, upload } from '../../utils/library';
import toast from 'react-hot-toast'

const ProfileCard = ({ editable = false }: { editable: boolean }) => {
    const [profileChanged, setProfileChanged] = useState(false)

    const inputElement = useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<File[]>([])
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
        tag: '@user',
        username: 'name',
        followers: 0,
        following: 0,
        avatar: 'https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg'
    })

    useEffect(() => {
        console.log('UseEffect');

        getProfile()
            .then(data => {
                //@ts-ignore
                let content: {
                    tag: string,
                    username: string,
                    followers: number,
                    follows: number,
                    avatar: string,
                } = data.content

                setProfileInfo({
                    tag: content.tag,
                    username: content.username,
                    followers: content.followers,
                    following: content.follows,
                    avatar: content.avatar
                })

            })
            .catch(err => console.log(err))

    }, [profileChanged])


    const clickInput = () => {
        if (!inputElement || !inputElement.current) return
        inputElement.current.click()
    }

    const handleChange = async () => {

        if (!inputElement || !inputElement.current || inputElement.current.files == null) return

        let fileValidator = new ImageValidator
        fileValidator.setSizeConstraint(2100000)

        let newFile = inputElement.current.files.item(0)
        let fileError = fileValidator.validate(newFile);

        try {
            if (fileError == "") {
                await handleUpload(newFile);
                setTimeout(() => {

                    setProfileChanged(!profileChanged)
                }, 5000);

            } else {
                console.log(fileError);
            }

        } catch (error) {
            console.log(error);
        }

    }

    const handleDeleFile = (file: File) => {
        setFiles(files.filter(curFile => curFile !== file))
    }

    const handleUpload = async (file: File | null) => {

        return new Promise<string>((resolve, reject) => {

            if (!file || file == null) reject("no file")
            setIsUploading(true)
            toast.promise(
                //@ts-ignore
                upload(file),
                {
                    loading: 'Saving...',
                    success: <b>upload successful</b>,
                    error: <b>failed uploading</b>,
                }
            ).then(data => {
                setIsUploading(false);
                resolve(data);
            }).catch(err => {
                reject(err);
                setIsUploading(false);
            })
        })


    }

    return (
        <div className=" flex flex-col gap-4 p-4 w-fit">

            <div className='relative'>
                <div className=' flex justify-center items-center h-60 w-60 rounded-full 
            overflow-hidden hover:cursor-pointer border-[2px] border-neutral-700'>
                    <img className=' h-[100%]'
                        src={profileInfo.avatar} alt="Profile picture" />
                </div>
                {
                    editable &&
                    <button className=' absolute py-1 px-3 bg-green-700 rounded-md border-neutral-500 
            border-[1px] hover:border-neutral-300 text-neutral-100 bottom-[5%] right-[5%] ' type="button"
                        onClick={() => clickInput()}>
                        Edit
                    </button>
                }

            </div>
            <div>
                <button className=' hover:text-green-700' type='button' > {profileInfo.tag} </button >
            </div>
            <button className=' bg-green-700 rounded-md border-neutral-500 
            border-[1px] hover:border-neutral-300 text-neutral-100' type="button"
            >
                Edit
            </button>
            <input multiple={false} type="file" className=" hidden" ref={inputElement}
                onChange={() => handleChange()} />
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

