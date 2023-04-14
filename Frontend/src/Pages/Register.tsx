import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import GreenWave2 from '../images/GreenWave2.jpg'
import GlobeImage from '../images/GlobeImage.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchRegister =  (email:string,pwd:string)=> {

  let url ="https://book-face-backend.vercel.app/register"

  
  return new Promise<boolean>((resolve, reject) => {

    let option = {
      method: "POST",
      Headers:{
        'accept':'application/json',
        'content': 'application/json'
      },
      body: JSON.stringify({
        email:email,
        pwd:pwd
      })
    }
    
    fetch(url,option)
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      console.log(data);
      
     resolve(false)
    })
    .catch((err)=>{
      console.log(err);
      resolve(false)
    })
  })

  

}


function Register (){


    const backgroundImageStyle = {
        backgroundImage: `url("${GreenWave2}")`,
        backgroundSize: 'cover', 

      };


    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfPassword, setConfPassword] = useState('')
    const [PasswordError, setPasswordError] = useState('')
    const [formError, setFormError] = useState('')
    const [checkBoxChecked, setCheckBoxChecked] = useState(false);
    const [registerOk, setRegisterOk] = useState(false)

    useEffect(()=>{

    },[])


    const handleCheckBoxChange = (e:any) => {
            setCheckBoxChecked(e.target.checked);
          };

    const handleSubmit = (e: any) => {
        console.log(formError)
        e.preventDefault()
        if ( !Email || !Password || !ConfPassword) {
          toast.error('Sign in unsuccessful!', {
            position: "top-center",
            autoClose: 1000
          })
          setFormError('Please fill in all fields.')
        } else if (!checkBoxChecked) {
          toast.error('Sign in unsuccessful!', {
            position: "top-center",
            autoClose: 1000
          })
          setFormError('Please accept the terms of use and privacy policy.')
        }else {
          console.log("Formulaire envoyé");

          
          
          setFormError('')
          toast.success('Sign in successful!', {
          position: "top-center",
          autoClose: 1000,
        onClose: () => {
          // window.location.href = "/Login";

        }})

          fetchRegister(Email,Password)
          .then((result)=>{
            if (result){
              console.log('OK');
              
            }
            else{
              console.log('Not ok');
              
            }
          })
          // setIsSubmitted(true)
        }
      
      }

    const handlePasswordChange = (e:any) => {
        setPassword(e.target.value)
        if (ConfPassword && e.target.value !== ConfPassword) {
          setPasswordError('The passwords do not match.')
        } else {
          setPasswordError('')
        }
      }
    
      const handleConfPasswordChange = (e:any) => {
        setConfPassword(e.target.value)
        if (e.target.value !== Password) {
          setPasswordError('The passwords do not match. ')
        } else {
          setPasswordError('')
        }
      }



      
    return (


<div className = "h-screen py-40" style={backgroundImageStyle}>
    <div className = "container mx-auto">
        <div className = "flex flex-col md:flex-row lg:flex-row w-9/12 md:w-11/12 lg:w-8/12 bg-green-50 rounded-xl mx-auto overflow-hidden" style={{ boxShadow: "10px 10px 20px #888888" }}>
            <div className = "w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center">
            <img src={GlobeImage}></img>
            </div>

           <div className = "w-full lg:w-1/2 py-10 px-12">
            <h2 className = "text-3xl mb-4 font-bold text-green-800">Register</h2>

            <p className="mb-4 w-48 text-green-800">Create your account.</p>
                
            {/* <form action="" onSubmit={handleSubmit}> */}
                
                <div className="mt-5">
                    <input type="email" placeholder="Email" name="Email" onChange={e => setEmail(e.target.value)} className="border border-gray-400 py-1 px-2 w-full" />
                </div>
                <div className="mt-5">
                    <input type="password" placeholder="Password" name="Password" value={Password} onChange={handlePasswordChange} className="border border-gray-400 py-1 px-2 w-full" />
                </div>
                <div className="mt-5">
                    <input type="password" placeholder="Confirm Password" name="ConfPassword" value={ConfPassword} onChange={handleConfPasswordChange} className="border border-gray-400 py-1 px-2 w-full" />
                    {PasswordError && <p>{PasswordError}</p>}
                    {formError && <p>{formError}</p>}
                </div>
                <div className="mt-5">
                   <input type="checkbox" name="checkbox" onChange={handleCheckBoxChange} className="border border-gray-400" />
                   <div className = "text-green-900"><span> I accept the <a href="#" className="font-semibold"> Terms of Use</a> & <a href="#" className=" font-semibold">Privacy Policy</a></span></div>
                </div>
                <div className="mt-5">
                <button  onClick={handleSubmit} className="bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 mr-4">Register Now</button>
                </div>
            {/* </form> */}
            
          </div>
        </div>
      </div>    
    </div>
    )

}

export default Register;