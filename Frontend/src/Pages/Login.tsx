
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import GreenWave2 from '../images/GreenWave2.jpg'
import GlobeImage from '../images/GlobeImage.png'
import toast, { Toaster } from 'react-hot-toast'
import React from 'react';
import { fetchLogin, fetchReg } from '../utils/library';
import { AiOutlineArrowLeft } from 'react-icons/ai';

type ResponseMsg = {
  status: number,
  message: string,
  content: object | []
}

function Login() {

  let navigate = useNavigate()

  const backgroundImageStyle = {
    backgroundImage: `url("${GreenWave2}")`,
    backgroundSize: 'cover',

  };

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [formError, setFormError] = useState('')
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);

  const handleSubmit = async () => {

    if (!Email || !Password) {
      toast.error('Incorrect email or password')
      setFormError('Please fill in all fields.')
    } else {

      let response = await fetchLogin(Email, Password)
      if (response.status == 100) {

        localStorage.setItem('VAToken', response.content as unknown as string || "");
        navigate("/home", { replace: true })
      }
      else {
        toast.error(response.message)
      }

    }

  }

  return (


    <div className="h-screen flex justify-center items-center bg-main-background bg-cover p-10" >
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="container mx-auto max-w-[600px]">
        <div className="flex flex-col md:flex-row  bg-green-50 rounded-xl mx-auto overflow-hidden" style={{ boxShadow: "10px 10px 20px #888888" }}>

          <div className="w-full py-10 px-12 ">
            <div className=' flex justify-between'>

              <button type='button'
                className=' flex items-center gap-2 bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 mb-4'
                onClick={() => navigate("/register", { replace: true })}>
                <AiOutlineArrowLeft />
                <span>Register</span>
              </button>
              <img className=' justify-self-start self-start max-h-[50px]' src={GlobeImage} alt="" />

            </div>
            <h2 className="text-3xl mb-4 font-bold text-green-800">Log In</h2>

            <div className="mt-5">
              <input type="email" placeholder="Email" name="Email" onChange={e => setEmail(e.target.value)} className="border border-gray-400 py-1 px-2 w-full" />
            </div>
            <div className="mt-5">
              <input type="password" placeholder="Password" name="Password" onChange={e => setPassword(e.target.value)} className="border border-gray-400 py-1 px-2 w-full" />
              {formError && <p>{formError}</p>}
            </div>

            <div className="mt-5">
              <button onClick={() => handleSubmit()} className="bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 mr-4">Log In</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )

}

export default Login;