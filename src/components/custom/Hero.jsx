import React from 'react';
import { Button } from '../ui/Button.jsx';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-col items-center px-5 sm:px-10 md:px-20 lg:px-32 xl:px-40 gap-9">
      <h1 className="font-extrabold font-serif text-3xl sm:text-4xl md:text-5xl text-center mt-24">
        <span className="text-[#f56551]">Discover your Next Adventure With AI:</span> Personalized Itineraries At Your Fingertips
      </h1>
      <p className="text-md sm:text-lg md:text-xl text-gray-500 text-center font-sans">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to="/create-trip">
        <Button>Get Started, It's Free</Button>
      </Link>

      <img src="/landingpage.jpeg"  className='-mt-5 shadow-sm mt-2 bottom-2' />

    </div>
  );
}

export default Hero;
