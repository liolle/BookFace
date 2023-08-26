'use client'
import Image from 'next/image'

import { useRouter } from 'next/navigation'

export default function Main() {

  const router = useRouter()

  return (
    <div className="h-screen bg-main-background bg-cover select-none">

      <div className="container mx-auto px-4 pt-16">
        <img src="/GlobeImage.png" alt="" className="mx-auto mb-5 pt-8 h-[350px] w-[400px]" />
        <h1 className="text-3xl font-bold text-center mb-5 text-green-800"> PHYSYS</h1>
        <p className="text-center text-xl mb-8 text-green-900">
          Express Yourself For A Greener Future!
        </p>
        <div className="flex justify-center mb-12">
          <button className="bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 mr-4"
            onClick={() => router.push("login")}>
              <span>Login</span>
          </button>
          <button className="bg-white hover:bg-green-700 text-green-600 hover:text-white font-bold py-2 px-4 rounded border-2 border-green-600 mr-4"
            onClick={() => router.push("register")}>
              <span>Register</span>
          </button>
        </div>
      </div>
    </div>
  )
}
