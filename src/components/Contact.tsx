
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleBookWorkshop = () => {
    navigate('/booking');
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-pink-500 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-white rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-12 sm:w-18 lg:w-24 h-12 sm:h-18 lg:h-24 bg-white rounded-full opacity-20 animate-bounce"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
          WHERE EVERY EXPERIENCE
          <br />
          TELLS A STORY
        </h2>
        
        <p className="text-lg sm:text-xl text-white/90 mb-2 sm:mb-4">
          TO ADD A SMILE
        </p>
        
        <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto px-2">
          Ready to start your creative journey? We're here to help you discover 
          the perfect workshop for your artistic adventure.
        </p>
        
        <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12 px-4">
          <button 
            onClick={handleBookWorkshop}
            className="bg-white text-pink-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            BOOK A WORKSHOP
          </button>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 text-white">
            <div className="text-center">
              <h3 className="font-bold mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl flex items-center justify-center">
                <span className="text-2xl sm:text-3xl mr-2 sm:mr-4">📞</span>
                Ring Us Up
              </h3>
              <p className="text-white/90 text-lg sm:text-xl lg:text-2xl font-medium">9591032562</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl flex items-center justify-center">
                <span className="text-2xl sm:text-3xl mr-2 sm:mr-4">🏠</span>
                Knock Us At
              </h3>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed">
                No.716 17th Main, 38th Cross,<br />
                4th T Block, Jayanagar,<br />
                Bangalore - 560041
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl flex items-center justify-center">
                <span className="text-2xl sm:text-3xl mr-2 sm:mr-4">📧</span>
                Email Us
              </h3>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg">hello@knowhow.studio</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl flex items-center justify-center">
                <span className="text-2xl sm:text-3xl mr-2 sm:mr-4">⏰</span>
                Hours
              </h3>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg">Mon-Sun: 9AM - 9PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
