import arrow from "../assets/down-arrow.png"
import MessGallery from "./MessGallery"
import {TypeAnimation} from 'react-type-animation'
import '../index.css'

function Homepage() {

  return (
    <>
    <div className='fixed p-2 left-1/4 w-1/2 flex items-center justify-center bg-white border-black border-4 rounded-3xl'>
      <p className="font-satoshi font-bold text-3xl text-yellow-500">MESS CONNECT</p>
    </div>
    <div className='h-screen'>
      <p className='mt-64'>
        <TypeAnimation className="text-7xl font-bold text-yellow-400 mt-20"
          sequence={[
              'Not able to find a mess?',
              1000, 
              'Struggling to communicate with mess providers?',
              1000,
              'Make your life much easier with Mess Connect',
              3000,
          ]}
          wrapper="span"
          speed={60}
          repeat={Infinity}
        />
      </p>
      <p className='absolute left-0 right-0 bottom-32 text-lg'>Get Started</p>
      <a href="#1"><img className='mx-auto absolute right-0 left-0 bottom-0 animate-bounce' src={arrow} width='100' height='100' alt="arrow"/></a>
    </div>
    <div id="1" className='flex gap-36 items-center justify-center'>
      <a href="/host" className='h-14 w-6/12 mb-32 flex items-center bg-yellow-100 justify-center hover:bg-yellow-400 transition duration-500 hover:scale-110 w-14 border-4 p-60 bg-white border-black rounded-3xl'>
        <p className='font-bold text-5xl text-black'>HOST A MESS SERVICE?</p>
      </a>
      <a href="/messgallery" className='h-14 w-6/12 mb-32 flex items-center justify-center bg-yellow-100 hover:bg-yellow-400 transition duration-500 hover:scale-110 w-14 border-4 p-60 bg-white border-black rounded-3xl'>
      <p className='font-bold text-5xl text-black'>AVAIL A MESS SERVICE?</p>
      </a>
    </div>
    </>
  )
}

export default Homepage
