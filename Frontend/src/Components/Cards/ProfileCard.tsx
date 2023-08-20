import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileInfo } from '../../utils/typess';
import { ImageValidator, multiUpload, upload } from '../../utils/library';
import toast from 'react-hot-toast'

const ProfileCard = ({ profileInfo, editable = false }: { profileInfo: ProfileInfo, editable: boolean }) => {

    const inputElement = useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<File[]>([])
    const [file, setFile] = useState<File>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    const clickInput = () => {
        if (!inputElement || !inputElement.current) return
        inputElement.current.click()
    }

    const handleChange = () => {

        if (!inputElement || !inputElement.current || inputElement.current.files == null) return

        let fileValidator = new ImageValidator
        fileValidator.setSizeConstraint(2100000)

        let fileError = fileValidator.validate(inputElement.current.files.item(0));
        if (fileError == "") {
            setFile(inputElement.current.files.item(0))
            handleUpload()
            inputElement.current.value = '';
        } else {
            console.log(fileError)
        }

    }

    const handleDeleFile = (file: File) => {
        setFiles(files.filter(curFile => curFile !== file))
    }

    const handleUpload = () => {
        if (!file) return
        setIsUploading(true)
        toast.promise(
            upload(file),
            {
                loading: 'Saving...',
                success: <b>upload successful</b>,
                error: <b>failed uploading</b>,
            }
        ).then(data => {
            setIsUploading(false)
        }).catch(err=>{
            setIsUploading(false)
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
                <button className=' absolute py-1 px-3 bg-green-700 rounded-md border-neutral-500 
            border-[1px] hover:border-neutral-300 text-neutral-100 bottom-[5%] right-[5%] ' type="button"
            onClick={() => clickInput()}>
                    Edit
                </button>

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

