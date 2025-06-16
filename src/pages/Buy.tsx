import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, CreditCard } from 'lucide-react';

const Buy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [kitType, setKitType] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (!storedUser) {
      navigate('/');
    }
    
    if (location.state?.kitType) {
      setKitType(location.state.kitType);
    }
  }, [navigate, location.state]);

  const getKitDetails = (type: string) => {
    switch (type) {
      case 'Beginner Kit':
        return {
          price: 599,
          description: 'Perfect for first-time crafters with all essential materials',
          includes: ['Basic crafting tools', 'Instruction manual', 'Starter materials', 'Safety equipment']
        };
      case 'Advanced Kit':
        return {
          price: 999,
          description: 'For experienced creators with premium tools and materials',
          includes: ['Premium tools', 'Advanced materials', 'Project templates', 'Video tutorials']
        };
      case 'Premium Kit':
        return {
          price: 1499,
          description: 'Complete professional set with exclusive materials',
          includes: ['Professional tools', 'Exclusive materials', 'Personal consultation', 'Lifetime support']
        };
      default:
        return { price: 0, description: '', includes: [] };
    }
  };

  const kitDetails = getKitDetails(kitType);
  const totalPrice = kitDetails.price * quantity;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handlePurchase = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
              {/* Product Image */}
              <div className="space-y-4 order-2 lg:order-1">
                <div className="aspect-square bg-gradient-to-br from-orange-200 to-pink-200 dark:from-orange-300 dark:to-pink-300 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-16 sm:h-20 lg:h-24 w-16 sm:w-20 lg:w-24 text-orange-600" />
                </div>
                <div className="text-center">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{kitType}</h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">{kitDetails.description}</p>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3">What's Included:</h3>
                  <ul className="space-y-2">
                    {kitDetails.includes.map((item, index) => (
                      <li key={index} className="flex items-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 sm:pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-medium text-gray-800 dark:text-white">Quantity:</span>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="h-8 w-8 p-0"
                      >
                        -
                      </Button>
                      <span className="text-base sm:text-lg font-medium text-gray-800 dark:text-white px-3 min-w-[2rem] text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(1)}
                        className="h-8 w-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-medium text-gray-800 dark:text-white">Price per item:</span>
                    <span className="text-base sm:text-lg font-medium text-gray-800 dark:text-white">₹{kitDetails.price}</span>
                  </div>

                  <div className="flex items-center justify-between text-lg sm:text-xl font-bold border-t border-gray-200 dark:border-gray-600 pt-4">
                    <span className="text-gray-800 dark:text-white">Total:</span>
                    <span className="text-orange-600">₹{totalPrice}</span>
                  </div>

                  <Button
                    onClick={handlePurchase}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base"
                    size="lg"
                  >
                    <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Purchase Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
