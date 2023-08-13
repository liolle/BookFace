import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkEmail, checkPassword, fetchReg } from '../utils/library';

function Register() {

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [ConfPassword, setConfPassword] = useState('')

  const [PasswordError, setPasswordError] = useState(' ')
  const [confPasswordError, setConfPasswordError] = useState(' ')
  const [EmailError, setEmailError] = useState(' ')

  let navigate = useNavigate()

  const resetErrors = () => {
    setConfPasswordError(' ')
    setPasswordError(' ')
    setEmailError(' ')
  }

  const handleSubmit = async () => {
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


    let response = await fetchReg(Email, Password)
    if (response.status == 100) {
      navigate("/login", { replace: true })
    }
    else {
      toast.error(response.message, {
        position: "top-center",
        hideProgressBar: true,
        pauseOnHover: true,
        autoClose: 3000
      })

    }


  }

  return (

    <div className="h-screen py-40 bg-main-background bg-cover p-10" >
      <div className=" mx-auto max-w-[600px]">
        <div className="flex flex-col md:flex-row bg-green-50 rounded-xl mx-auto overflow-hidden" style={{ boxShadow: "10px 10px 20px #888888" }}>

          <div className="w-full py-10 px-12">
            <div className=' flex justify-end'>

              <button type='button'
                className=' bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 mb-4 '
                onClick={() => navigate("/login", { replace: true })}>
                <span>Login</span>
                <span>{' -->'}</span>
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