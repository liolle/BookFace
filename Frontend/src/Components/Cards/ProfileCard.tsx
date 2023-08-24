import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { ProfileInfo } from '../../utils/typess';
import { ImageValidator, changeTag, getProfile, multiUpload, upload } from '../../utils/library';
import toast from 'react-hot-toast'
import ProfileImage from '../ImageFrame/ProfileImage';
import Followings from '../Stats/Following';

const ProfileCard = ({ editable = false }: { editable: boolean }) => {

    const modalRef = useRef<HTMLDialogElement>(null)
    const inputElement = useRef<HTMLInputElement | null>(null);
    const tagRef = useRef<HTMLInputElement | null>(null);

    const [editOpen,setEdiOpen] = useState(false)
    const [profileChanged, setProfileChanged] = useState(false)
    const [files, setFiles] = useState<File[]>([])
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
        tag: '@user',
        username: 'name',
        followers: 0,
        following: 0,
        avatar: ''
    })

    useEffect(() => {

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

    const handleEdit = () => {
        if (! editable) return
        setEdiOpen(!editOpen)
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

    const handleNameChange = (event: React.FormEvent) => {
        event.preventDefault()
        if (!tagRef || !tagRef.current || tagRef.current.value == '') {
            let dialog = modalRef.current as HTMLDialogElement
            if (dialog) dialog.close()

            return;
        }

        toast.promise(
            //@ts-ignore
            changeTag(tagRef.current.value),
            {
                loading: 'Saving...',
                success: <b>Change successful</b>,
                error: <b>Change failed</b>,
            }
        ).then(data => {
            setTimeout(() => {
                setProfileChanged(!profileChanged)
            }, 5000);
        }).catch(err => {
        })

        tagRef.current.value = ''
        if (modalRef.current) modalRef.current.close()
    }

    const openModal = () => {
        if (!modalRef || !modalRef.current) return;
        modalRef.current.showModal();
    }

    return (
        <div className=" flex flex-col gap-4 p-4 w-fit max-h-[100vh]">

            <dialog className="modal bg-[#f4f4f450]" ref={modalRef}>
                <form method="dialog" className="modal-box flex flex-col bg-neutral-100 gap-6 ">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 " >✕</button>
                    <div className="form-control w-full max-w-xs ">
                        <label className="label">
                            <span className="label-text w-full">What is your name?</span>
                        </label>
                        <input type="text" placeholder="Enter new tag" className="input input-bordered w-full " ref={tagRef} />


                    </div>
                    <button onClick={handleNameChange} className="btn" >Save</button>
                </form>
            </dialog>

            <ProfileImage editable={editable} onEdit={clickInput} profileInfo={profileInfo} />
            <div>
                <button className=' hover:text-green-700' type='button'
                    onClick={() => openModal()}> {profileInfo.tag} </button >
            </div>

            <button className=' bg-green-700 rounded-md border-neutral-500 
            border-[1px] hover:border-neutral-300 text-neutral-100' type="button"
            onClick={()=>handleEdit()}
            >
                Edit
            </button>

            <input multiple={false} type="file" className=" hidden" ref={inputElement}
                onChange={() => handleChange()} />

            <Followings profileInfo={profileInfo} />

            {
                editOpen &&
                <div className=' flex justify-center items-center h-[300px] '>
                    <span> editable options </span>
                    {/* <button type='button' className=' text-xs'> https://github/liolle </button> */}
                </div>
            }


        </div>
    );
};

export default ProfileCard;

