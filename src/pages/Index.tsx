
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

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (!storedUser) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-teal-400">
      <Navigation />
      <Hero />
      <About />
      <Activities />
      <Stats />
      <Testimonials />
      <Location />
      <Contact />
    </div>
  );
};

export default Index;
