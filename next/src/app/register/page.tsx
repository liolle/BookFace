'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineArrowRight } from 'react-icons/ai';
import NavButton from '../../../components/buttons/navButton';
import { checkEmail, checkPassword, fetchReg } from '../../../utils/library';
import { ResponseMsg } from '../../../utils/types';
import BaseInput from '../../../components/inputs/baseinput';

export default function Register() {

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfPassword, setConfPassword] = useState('')

    const [PasswordError, setPasswordError] = useState(' ')
    const [confPasswordError, setConfPasswordError] = useState(' ')
    const [EmailError, setEmailError] = useState(' ')
    const [isRequesting, setIsRequesting] = useState(false)

    const router = useRouter()

    const resetErrors = () => {
        setConfPasswordError(' ')
        setPasswordError(' ')
        setEmailError(' ')
    }

    const handleSubmit = async () => {
        if (isRequesting) return

        resetErrors()
        if (!Email) {
            setEmailError('Enter a valid email')
            return
        }

        if (!Password) {
            setPasswordError('Enter a password')
            return
        }


        if (!checkEmail(Email, setEmailError)) return
        if (!checkPassword(Password, setPasswordError)) return

        if (Password != ConfPassword) {
            setPasswordError("Passwords do not match")
            setConfPasswordError("Passwords do not match")
            return
        }
        setConfPasswordError(" ")

        setIsRequesting(true)
        try {
            const fetcher: ResponseMsg = await fetchReg(Email, Password)
            toast.success(`${fetcher.message}`)
            setIsRequesting(false)
        } catch (error) {
            toast.error(`${(error as ResponseMsg).message}`)
            setIsRequesting(false)
        }


    }

    return (

        <div className="h-screen flex justify-center items-center bg-main-background bg-cover p-10" >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="container mx-auto max-w-[600px]">
                <div className="flex flex-col md:flex-row bg-primary-white rounded-xl mx-auto overflow-hidden" style={{ boxShadow: "10px 10px 20px #888888" }}>
                    <div className="flex flex-col gap-6 w-full py-10 px-12">
                        <div className=' flex justify-between items-center '>
                            <img className=' justify-self-start self-start max-h-[50px]' src='/GlobeImage.png' alt="" />
                            <NavButton route={'/login'}>
                                <div className=' flex justify-between items-center gap-2'>
                                    <span>Login</span>
                                    <AiOutlineArrowRight />
                                </div>
                            </NavButton>
                        </div>

                        <span className="text-3xl font-bold text-green-800">Register</span>

                        <div className="">
                            <BaseInput type='email' placeholder="Email" name="Email" onChange={e => setEmail(e)} />
                            <div className=' text-red-600'>{EmailError}</div>
                        </div>
                        <div className="">
                            <BaseInput type='password' placeholder="Password" name="Password" onChange={e => setPassword(e)} />
                            <div className=' text-red-600'>{PasswordError}</div>
                        </div>
                        <div className="">
                            <BaseInput type='password' placeholder="Confirm Password" name="ConfPassword" onChange={e => setConfPassword(e)} />
                            <div className=' text-red-600'>{confPasswordError}</div>
                        </div>

                        <NavButton  action={() => handleSubmit()}>
                            <div className=' '>
                                <span>Register</span>
                            </div>
                        </NavButton>
                    </div>
                </div>
            </div>
        </div>
    )

}

