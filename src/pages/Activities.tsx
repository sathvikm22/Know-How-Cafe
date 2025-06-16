
import { ArrowLeft, Clock, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Activities = () => {
  const navigate = useNavigate();

  const activities = [
    {
      name: "Tufting",
      description: "Create beautiful rugs and wall hangings with our premium tufting guns and yarns",
      longDescription: "Learn the art of tufting to create stunning rugs and wall hangings. Our expert instructors will guide you through punch needle techniques, color theory, and finishing methods.",
      emoji: "🧵",
      price: 1500,
      duration: "3 hours",
      difficulty: "Beginner",
      maxParticipants: 8,
      rating: 4.8,
      color: "from-yellow-300 to-orange-300",
      features: ["All materials included", "Take home your creation", "Expert guidance", "Refreshments provided"]
    },
    {
      name: "Jewelry Making",
      description: "Craft unique pieces from scratch with premium materials and professional tools",
      longDescription: "Design and create beautiful jewelry pieces using various techniques including wire wrapping, beading, and metalwork. Perfect for beginners and experienced crafters alike.",
      emoji: "💎",
      price: 1200,
      duration: "2.5 hours",
      difficulty: "Beginner",
      maxParticipants: 10,
      rating: 4.9,
      color: "from-pink-300 to-purple-300",
      features: ["Premium materials", "Professional tools", "Multiple techniques", "Personal consultation"]
    },
    {
      name: "Block Printing",
      description: "Traditional printing techniques on fabrics and paper using hand-carved blocks",
      longDescription: "Explore the ancient art of block printing. Learn to carve your own blocks and create beautiful patterns on fabric and paper using traditional techniques.",
      emoji: "🎨",
      price: 800,
      duration: "2 hours",
      difficulty: "Beginner",
      maxParticipants: 12,
      rating: 4.7,
      color: "from-blue-300 to-cyan-300",
      features: ["Hand-carved blocks", "Natural dyes", "Multiple fabrics", "Pattern design"]
    },
    {
      name: "Eco Printing",
      description: "Natural dyeing using leaves and flowers to create unique sustainable prints",
      longDescription: "Discover eco-friendly printing using natural materials. Create beautiful prints using leaves, flowers, and natural mordants for sustainable fashion.",
      emoji: "🌿",
      price: 900,
      duration: "2.5 hours",
      difficulty: "Intermediate",
      maxParticipants: 8,
      rating: 4.6,
      color: "from-green-300 to-emerald-300",
      features: ["Organic materials", "Sustainable methods", "Unique patterns", "Eco-friendly process"]
    },
    {
      name: "Leather Diaries",
      description: "Hand-bind your own leather journals and notebooks with traditional bookbinding",
      longDescription: "Learn traditional bookbinding techniques to create beautiful leather-bound journals. Perfect for gifts or personal use.",
      emoji: "📖",
      price: 1100,
      duration: "3 hours",
      difficulty: "Intermediate",
      maxParticipants: 6,
      rating: 4.8,
      color: "from-amber-300 to-yellow-300",
      features: ["Genuine leather", "Traditional binding", "Custom embossing", "Quality paper"]
    },
    {
      name: "Phone Cases",
      description: "Design and create personalized phone accessories with various decorative techniques",
      longDescription: "Create unique phone cases using various decorating techniques including painting, decoupage, and embellishment.",
      emoji: "📱",
      price: 700,
      duration: "1.5 hours",
      difficulty: "Beginner",
      maxParticipants: 12,
      rating: 4.5,
      color: "from-purple-300 to-pink-300",
      features: ["Multiple phone models", "Various techniques", "Protective coating", "Instant use"]
    },
    {
      name: "Stuffed Toys",
      description: "Sew adorable plush companions from start to finish using soft premium fabrics",
      longDescription: "Create cuddly stuffed toys from scratch. Learn basic sewing techniques and bring your imagination to life with soft, huggable creations.",
      emoji: "🧸",
      price: 1300,
      duration: "4 hours",
      difficulty: "Intermediate",
      maxParticipants: 8,
      rating: 4.9,
      color: "from-rose-300 to-red-300",
      features: ["Premium fabrics", "Safety materials", "Pattern templates", "Sewing machine access"],
      image: "/lovable-uploads/0e6eee87-afef-4104-9ec6-b5fed2735365.png"
    },
    {
      name: "Fridge Magnets",
      description: "Create colorful and fun magnets for your refrigerator using various materials",
      longDescription: "Design and craft personalized fridge magnets using clay, resin, fabric, and other creative materials. Perfect for home decoration or gifts.",
      emoji: "🧲",
      price: 500,
      duration: "1.5 hours",
      difficulty: "Beginner",
      maxParticipants: 15,
      rating: 4.4,
      color: "from-purple-300 to-pink-300",
      features: ["Multiple materials", "Colorful designs", "Strong magnets", "Kid-friendly"]
    }
  ];

  const handleBookActivity = (activityName: string) => {
    navigate(`/booking?activity=${encodeURIComponent(activityName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <Navigation />
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              ALL OUR
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CREATIVE ACTIVITIES
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our full range of hands-on creative experiences designed to inspire and relax
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {activities.map((activity, index) => (
              <div
                key={activity.name}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className={`h-32 bg-gradient-to-r ${activity.color} flex items-center justify-center relative`}>
                  {activity.image ? (
                    <img 
                      src={activity.image} 
                      alt={activity.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl">{activity.emoji}</div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{activity.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{activity.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{activity.longDescription}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-600">{activity.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-600">Max {activity.maxParticipants}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">What's Included:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {activity.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">₹{activity.price}</span>
                      <span className="text-sm text-gray-500 ml-1">per person</span>
                    </div>
                    <button
                      onClick={() => handleBookActivity(activity.name)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
