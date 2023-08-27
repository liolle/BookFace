'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import NavButton from '../../../../../components/buttons/navButton';
import BaseInput from '../../../../../components/inputs/baseinput';

export default function Login() {

    const router = useRouter()

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [formError, setFormError] = useState('')

    const handleSubmit = async () => {

        if (!Email || !Password) {
            toast.error('Incorrect email or password')
            setFormError('Please fill in all fields.')
        } else {


            let response = await signIn('credentials',{
                email:Email,
                pwd:Password,
                redirect:false,
                
            })

            if (response?.ok) return router.push('/home');
            if(response) toast.error(response?.error);

        }

    }

    return (


        <div className="h-screen flex justify-center items-center bg-main-background bg-cover p-10" >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="container mx-auto max-w-[600px]">
                <div className="flex flex-col md:flex-row  bg-primary-white rounded-xl mx-auto overflow-hidden" style={{ boxShadow: "10px 10px 20px #888888" }}>

                    <div className="flex flex-col gap-6 w-full py-10 px-12 ">
                        <div className=' flex justify-between'>
                            <NavButton route={'/register'}>
                                <div className=' flex justify-between items-center gap-2'>
                                    <AiOutlineArrowLeft />
                                    <span>Register</span>
                                </div>
                            </NavButton>
                            <img className=' justify-self-start self-start max-h-[50px]' src='/GlobeImage.png' alt="" />
                        </div>

                        <h2 className="text-3xl mb-4 font-bold text-green-800">Log In</h2>

                        <div className="">
                            <BaseInput type='email' placeholder="Email" name="Email" onChange={e => setEmail(e)} />
                        </div>

                        <div className="">
                            <BaseInput type='password' placeholder="Password" name="Password" onChange={e => setPassword(e)} />
                            <div className=' text-red-600'>{formError}</div>
                        </div>

                        <NavButton route={'/login'} action={() => handleSubmit()}>
                            <div className=' '>
                                <span>Log In</span>
                            </div>
                        </NavButton>


                    </div>
                </div>
            </div>
        </div>
    )

}
