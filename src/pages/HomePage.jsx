import React from "react";
import arrow from "../assets/down-arrow.png";
import MessGallery from "./MessGallery";
import { TypeAnimation } from "react-type-animation";
import ThreeScene from "./ThreeScene";  // Import Three.js component
import "../index.css";

function Homepage() {
  return (
    <section className="text-center w-screen bg-yellow-400 p-8">
    <div className='fixed p-2 left-0 right-0 mx-auto w-1/4 flex bg-white items-center justify-center border-black border-4 rounded-3xl'>
      <p className="font-satoshi font-bold text-3xl text-yellow-500">MESS CONNECT</p>
    </div>
    <div className='h-screen'>
      <p className='p-64'>
        <TypeAnimation className="text-7xl font-bold text-white mt-20"
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
      <ThreeScene/>
      <p className='absolute left-0 right-0 bottom-32 text-lg'>Get Started</p>
      <a href="#1"><img className='mx-auto absolute right-0 left-0 bottom-0 animate-bounce' src={arrow} width='100' height='100' alt="arrow"/></a>
    </div>
    <div id="1" className='flex gap-36 pt-48 pl-48 pr-48 items-center justify-center'>
      <a href="/host/messLogin" className='h-14 w-1/2 mb-32 flex items-center justify-center hover:bg-yellow-400 transition duration-500 hover:scale-110 border-4 p-60 bg-white border-black rounded-3xl'>
        <p className='font-bold text-5xl text-black'>HOST A MESS SERVICE?</p>
      </a>
      <a href="/studentLogin" className='h-14 w-1/2 mb-32 flex items-center justify-center hover:bg-yellow-400 transition duration-500 hover:scale-110 border-4 p-60 bg-white border-black rounded-3xl'>
      <p className='font-bold text-5xl text-black'>AVAIL A MESS SERVICE?</p>
      </a>
    </div>
    </section>
  );
}

export default Homepage;
