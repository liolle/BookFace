import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GreenWave2 from '../images/GreenWave2.jpg'
import GlobeImage from '../images/GlobeImage.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkEmail, checkPassword, fetchReg } from '../utils/library';

function Register() {


  const backgroundImageStyle = {
    backgroundImage: `url("${GreenWave2}")`,
    backgroundSize: 'cover',

  };


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
      console.log("here");
      return
    }

    if (!Password) {
      setPasswordError('Enter a password')
      console.log("here");

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


    <div className="h-screen py-40" style={backgroundImageStyle}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row lg:flex-row w-9/12 md:w-11/12 lg:w-8/12 bg-green-50 rounded-xl mx-auto overflow-hidden" style={{ boxShadow: "10px 10px 20px #888888" }}>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center">
            <img src={GlobeImage}></img>
          </div>

          <div className="w-full lg:w-1/2 py-10 px-12">
            <h2 className="text-3xl mb-4 font-bold text-green-800">Register</h2>

            <p className="mb-4 w-48 text-green-800">Create your account.</p>

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