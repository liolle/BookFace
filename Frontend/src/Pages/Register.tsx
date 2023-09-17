import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import GlobeImage from '../images/GlobeImage.png'
import { checkEmail, checkPassword, fetchReg } from '../utils/library';
import { ResponseMsg } from '../utils/typess';
import { AiOutlineArrowRight } from 'react-icons/ai';

function Register() {

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [ConfPassword, setConfPassword] = useState('')

  const [PasswordError, setPasswordError] = useState(' ')
  const [confPasswordError, setConfPasswordError] = useState(' ')
  const [EmailError, setEmailError] = useState(' ')
  const [isRequesting,setIsRequesting] = useState(false)

  let navigate = useNavigate()

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
      setIsRequesting(false )
    }


  }

  return (

    <div className="h-screen py-40 bg-main-background bg-cover p-10" >
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className=" mx-auto max-w-[600px]">
        <div className="flex flex-col md:flex-row bg-green-50 rounded-xl mx-auto overflow-hidden" style={{ boxShadow: "10px 10px 20px #888888" }}>

          <div className="w-full py-10 px-12">
            <div className=' flex justify-between items-center mb-2'>
              <img className=' justify-self-start self-start max-h-[50px]' src={GlobeImage} alt="" />
              <button type='button'
                className=' flex items-center gap-2 bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 '
                onClick={() => navigate("/login", { replace: true })}>
                <span>Login</span>
                <AiOutlineArrowRight/>
              </button>
            </div>
            <span className="text-3xl mb-4 font-bold text-green-800">Register</span>

            <div className="mt-5">
              <input type="email" placeholder="Email" name="Email" onChange={e => setEmail(e.target.value)} className="border border-gray-400 py-1 px-2 w-full" />
              <div className=' text-red-600'>{EmailError}</div>
            </div>
            
            <div className="mt-5">
              <input type="password" placeholder="Password" name="Password" value={Password}
                onChange={e => setPassword(e.target.value)}
                className="border border-gray-400 py-1 px-2 w-full" />
              <div className=' text-red-600'>{PasswordError}</div>
            </div>

            <div className="mt-5">
              <input type="password" placeholder="Confirm Password" name="ConfPassword" value={ConfPassword}
                onChange={e => setConfPassword(e.target.value)} className="border border-gray-400 py-1 px-2 w-full" />
              <div className=' text-red-600'>{confPasswordError}</div>
            </div>

            <div className="mt-5">
              <button onClick={() => handleSubmit()} className="bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 mr-4">Register Now</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )

}

export default Register;