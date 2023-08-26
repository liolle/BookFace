'use client'
import NavButton from '../../components/buttons/navButton'
export default function Main() {


  return (
    <div className=" flex flex-col gap-4 justify-center items-center h-screen bg-main-background bg-cover select-none">

      <img src="/GlobeImage.png" alt="" className=" h-[350px] w-[400px]" />
      <span className="text-3xl font-bold text-center  text-secondary-green">PHYSYS</span>
      <span className="text-center text-xl  text-secondary-green">
        Express Yourself For A Greener Future!
      </span>
      <div className="flex justify-center gap-4">
        <NavButton route='/login'>
          <span>Login</span>
        </NavButton>
        <NavButton route='/register'>
          <span>Register</span>
        </NavButton>
      </div>

    </div>
  )
}
