import React from 'react';

const HomePage = () => (
  <div className="scroll-smooth">
    {/* Hero Section */}
    <section className="flex flex-col sm:min-h-[60vh] md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-12">
      {/* Text Content */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
          MESS <span className="text-yellow-400">CONNECT</span>
        </h1>
        <p className="text-lg text-gray-600 animate-pulse">
          Seamlessly connect mess owners and diners.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/host/messLogin"
             className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md">
            HOST A MESS SERVICE?
          </a>
          <a href="/studentLogin"
             className="px-6 py-3 bg-white border border-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-100">
            AVAIL A MESS SERVICE?
          </a>
        </div>
      </div>
      {/* Illustration/Image */}
      <div className="md:w-1/2 mt-10 md:mt-0">
        {/* Replace the src with a relevant SVG or image */}
        <img
          src="https://source.unsplash.com/600x400/?community,food"
          alt="Mess Service Illustration"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Why MessConnect?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-xl">Easy Setup</h3>
            <p className="mt-2 text-gray-600">
              Register or find a mess with just a few steps.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-xl">Trusted Hosts</h3>
            <p className="mt-2 text-gray-600">
              All mess owners are verified for quality service.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-xl">24/7 Support</h3>
            <p className="mt-2 text-gray-600">
              Round-the-clock assistance for hosts and diners.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;