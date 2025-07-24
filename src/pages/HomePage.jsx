import React from "react";
import arrow from "../assets/down-arrow.png";
import MessGallery from "./MessGallery";
import { TypeAnimation } from "react-type-animation";
import ThreeScene from "./ThreeScene";  // Import Three.js component
import "../index.css";

function Homepage() {
  return (
    <section className="text-center w-screen bg-yellow-300 p-8">
      <div className="z-10 fixed p-2 left-0 right-0 mx-auto w-1/2 flex bg-white border-yellow-500 border-4 items-center justify-center rounded-3xl
        ">
        <p className="font-satoshi font-bold text-yellow-500 text-center text-lg xs:text-xl sm:text-2xl md:text-3xl">
          MESS CONNECT
        </p>
      </div>

      <div className="h-screen z-0">
        <p className="p-20 text-3xl sm:text-2xl md:text-3xl lg:text-5xl">
          <TypeAnimation
            className="font-bold text-black mt-20 block"
            sequence={[
              "Not able to find a mess?",
              1000,
              "Struggling to communicate with mess providers?",
              1000,
              "Make your life much easier with Mess Connect",
              3000,
            ]}
            wrapper="span"
            speed={60}
            repeat={Infinity}
          />
        </p>

        <ThreeScene />

        <p className="absolute p-5 left-0 right-0 bottom-28 text-lg sm:text-2xl">Get Started</p>
        <a href="#1">
          <img
            className="mx-auto absolute right-0 left-0 bottom-0 animate-bounce w-[80px] sm:w-[100px]"
            src={arrow}
            alt="arrow"
          />
        </a>
      </div>

      <div
        id="1"
        className="flex flex-col lg:flex-row gap-12 lg:gap-36 pt-24 lg:pt-48 lg:pl-48 lg:pr-48 items-center justify-center"
      >
        <a
          href="/host/messLogin"
          className="text-black hover:text-white h-auto lg:h-14 p-24 lg:w-1/2 mb-8 lg:mb-32 flex items-center justify-center hover:border-none hover:bg-yellow-500 transition duration-300 hover:scale-110 border-4 lg:p-60 bg-white border-black rounded-3xl"
        >
          <p className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center">
            HOST A MESS SERVICE?
          </p>
        </a>

        <a
          href="/studentLogin"
          className="text-black hover:text-white h-auto lg:h-14 p-24 lg:w-1/2 mb-8 lg:mb-32 flex items-center justify-center hover:border-none hover:bg-yellow-500 transition duration-300 hover:scale-110 border-4 lg:p-60 bg-white border-black rounded-3xl"
        >
          <p className="font-bold text-2xl sm:text-3xl lg:text-5xl text-center">
            AVAIL A MESS SERVICE?
          </p>
        </a>
      </div>
    </section>
  );
}

export default Homepage;
