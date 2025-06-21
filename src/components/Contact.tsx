import { Instagram, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleBookWorkshop = () => {
    navigate('/booking');
  };

  return (
    <>
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-pink-500 dark:bg-pink-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-white rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-12 sm:w-18 lg:w-24 h-12 sm:h-18 lg:h-24 bg-white rounded-full opacity-20 animate-bounce"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white dark:text-pink-700 mb-4 sm:mb-6 px-2">
            WHERE EVERY EXPERIENCE
            <br />
            TELLS A STORY
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-white/90 dark:text-pink-800 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto px-2">
            Ready to start your creative journey? We're here to help you discover 
            the perfect workshop for your artistic adventure.
          </p>
          
          <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12 px-4">
            <button 
              onClick={handleBookWorkshop}
              className="bg-white dark:bg-pink-100 text-pink-600 dark:text-pink-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              BOOK A WORKSHOP
            </button>
          </div>
        </div>
      </section>

      <div className="w-full bg-cyan-50 dark:bg-gray-800 py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-6 sm:gap-8 lg:gap-12">
            {/* Instagram Section */}
            <div className="flex flex-col items-center text-center">
              <a href="https://instagram.com/know.howindia" target="_blank" rel="noopener noreferrer" className="w-20 h-20 bg-cyan-500 dark:bg-cyan-500 rounded-full flex items-center justify-center mb-4 hover:scale-105 transition-transform">
                <Instagram className="text-white w-10 h-10" />
              </a>
              <h3 className="font-bold mb-2 text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-white">Instagram</h3>
              <p className="text-gray-700 dark:text-white text-sm sm:text-base lg:text-lg">@know.howindia</p>
            </div>

            {/* Phone Section */}
            <div className="flex flex-col items-center text-center">
              <a href="tel:9591032562" target="_blank" rel="noopener noreferrer" className="w-20 h-20 bg-cyan-500 dark:bg-cyan-500 rounded-full flex items-center justify-center mb-4 hover:scale-105 transition-transform">
                <Phone className="text-white w-10 h-10" />
              </a>
              <h3 className="font-bold mb-2 text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-white">Phone</h3>
              <p className="text-gray-700 dark:text-white text-sm sm:text-base lg:text-lg">95910 32562</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
