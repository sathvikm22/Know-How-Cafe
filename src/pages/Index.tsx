import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Activities from '../components/Activities';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import Location from '../components/Location';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import React from 'react';

const EventsSection = () => {
  const navigate = useNavigate();
  const handleBoxClick = (combo: string) => {
    navigate(`/booking?combo=${encodeURIComponent(combo)}`);
  };
  return (
    <div id="events-section" className="max-w-5xl mx-auto py-12 px-4 scroll-mt-28">
      {/* Gradient Heading */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-2">
        <span className="block text-black">DISCOVER OUR</span>
        <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 via-red-400 via-green-400 to-blue-400 bg-clip-text text-transparent">CREATIVE EVENTS</span>

      </h2>
      <div className="mx-auto mb-8 mt-2 w-40 h-1 rounded-full bg-gradient-to-r from-pink-400 via-orange-300 via-yellow-300 via-green-400 to-blue-400"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Host Your Occasion */}
        <button
          className="group rounded-2xl bg-orange-100 p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 focus:outline-none"
          type="button"
          onClick={() => handleBoxClick('Host Your Occasion')}
          aria-label="Host Your Occasion"
        >
          <span className="mb-4 text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 0C7.582 4 4 7.582 4 12c0 4.418 3.582 8 8 8s8-3.582 8-8c0-4.418-3.582-8-8-8z" /></svg>
          </span>
          <h2 className="text-2xl font-extrabold mb-2 text-orange-800 group-hover:text-orange-900 transition-colors">Host Your Occasion</h2>
          <p className="mb-4 text-base font-medium text-gray-700">We host your special day by our trained host who will keep the attendees engaged.<br/>We provide you the place for celebration.</p>
          <div className="mb-2 px-4 py-1 rounded-full bg-orange-300 text-orange-900 font-bold text-lg">2 hours for ₹499/person</div>
          <div className="text-sm text-gray-700 font-semibold">Includes materials for the workshops<br/>At least 3 activities</div>
        </button>
        {/* We Come To Your Place */}
        <button
          className="group rounded-2xl bg-yellow-100 p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 focus:outline-none"
          type="button"
          onClick={() => handleBoxClick('We Come To Your Place')}
          aria-label="We Come To Your Place"
        >
          <span className="mb-4 text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2M12 12v4m0 0l-2-2m2 2l2-2m-6-6V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
          </span>
          <h2 className="text-2xl font-extrabold mb-2 text-yellow-800 group-hover:text-yellow-900 transition-colors">We Come To Your Place</h2>
          <p className="mb-4 text-base font-medium text-gray-700">We come to your place to celebrate.<br/>2 hours for ₹399/person</p>
          <div className="mb-2 px-4 py-1 rounded-full bg-yellow-300 text-yellow-900 font-bold text-lg">2 hours for ₹399/person</div>
          <div className="text-sm text-gray-700 font-semibold">Includes materials for the workshops<br/>At least 3 activities</div>
        </button>
        {/* Corporate Workshops */}
        <button
          className="group rounded-2xl bg-red-100 p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 focus:outline-none"
          type="button"
          onClick={() => handleBoxClick('Corporate Workshops')}
          aria-label="Corporate Workshops"
        >
          <span className="mb-4 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V6a4 4 0 00-8 0v4m12 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2h12a2 2 0 012 2z" /></svg>
          </span>
          <h2 className="text-2xl font-extrabold mb-2 text-red-800 group-hover:text-pink-900 transition-colors">Corporate Workshops</h2>
          <p className="mb-4 text-base font-medium text-gray-700">Are you looking to give your employees a day off to unwind and unleash their inner child? Book us for your Corporate spaces.</p>
          <div className="mb-2 px-4 py-1 rounded-full bg-red-300 text-red-900 font-bold text-lg">Starting from just ₹299/person</div>
          <div className="text-sm text-gray-700 font-semibold">Includes materials for the workshops<br/>At least 3 activities</div>
        </button>
      </div>
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (!storedUser) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-purple-100 transition-colors duration-300">
      <Navigation />
      <Hero />
      <About />
      <Activities />
      <EventsSection />
      <Stats />
      <Testimonials />
      <Location />
      <Contact />
    </div>
  );
};

export default Index;
