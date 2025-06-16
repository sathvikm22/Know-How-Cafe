import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, CreditCard, Smartphone, QrCode, Check, Users } from 'lucide-react';
import Navigation from '../components/Navigation';

const Booking = () => {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [participants, setParticipants] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const activities = [
    { name: "Tufting", price: 1500, duration: "3 hours" },
    { name: "Jewelry Making", price: 1200, duration: "2.5 hours" },
    { name: "Block Printing", price: 800, duration: "2 hours" },
    { name: "Eco Printing", price: 900, duration: "2.5 hours" },
    { name: "Leather Diaries", price: 1100, duration: "3 hours" },
    { name: "Phone Cases", price: 700, duration: "1.5 hours" },
    { name: "Stuffed Toys", price: 1300, duration: "4 hours" },
    { name: "Fridge Magnets", price: 500, duration: "1.5 hours" }
  ];

  const timeSlots = [
    "9:00 AM - 12:00 PM",
    "1:00 PM - 4:00 PM",
    "5:00 PM - 8:00 PM"
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI', icon: QrCode }
  ];

  const rooms = [
    {
      id: 'intimate',
      name: 'Intimate Studio',
      capacity: '3-4 people',
      description: 'Perfect for small groups and focused learning',
      features: ['Cozy atmosphere', 'Personal attention', 'Quiet environment'],
      price: 0
    },
    {
      id: 'collaborative',
      name: 'Collaborative Space',
      capacity: '3 teams of 2-3 people',
      description: 'Ideal for team building and group activities',
      features: ['Team workstations', 'Interactive setup', 'Group dynamics'],
      price: 200
    },
    {
      id: 'standard',
      name: 'Standard Workshop',
      capacity: '3-4 people',
      description: 'Our classic workshop experience',
      features: ['Traditional setup', 'Standard equipment', 'Comfortable seating'],
      price: 100
    }
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const activity = urlParams.get('activity');
    if (activity) {
      setSelectedActivity(activity);
    }
  }, []);

  const selectedActivityData = activities.find(a => a.name === selectedActivity);
  const selectedRoomData = rooms.find(r => r.id === selectedRoom);
  const totalAmount = selectedActivityData ? (selectedActivityData.price * participants) + (selectedRoomData?.price || 0) : 0;

  const handleBooking = () => {
    if (!selectedActivity || !selectedDate || !selectedTime || !selectedPayment || !selectedRoom) {
      alert('Please fill in all required fields');
      return;
    }
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <Navigation />
        <div className="pt-20 px-4">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Booking Confirmed!</h1>
              <p className="text-gray-600 dark:text-gray-300">Your creative journey awaits</p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Booking Details</h2>
              <div className="space-y-2 text-left text-gray-700 dark:text-gray-300">
                <p><strong>Activity:</strong> {selectedActivity}</p>
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Room:</strong> {selectedRoomData?.name}</p>
                <p><strong>Participants:</strong> {participants}</p>
                <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
                <p><strong>Payment Method:</strong> {paymentMethods.find(p => p.id === selectedPayment)?.name}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => window.location.href = '/home'}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
              >
                Back to Home
              </button>
              <button 
                onClick={() => window.print()}
                className="w-full border-2 border-orange-500 text-orange-500 dark:text-orange-400 dark:border-orange-400 py-3 rounded-full font-medium hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Print Confirmation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation />
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6">
              <h1 className="text-3xl font-bold text-white">Book Your Creative Session</h1>
              <p className="text-yellow-100 mt-2">Choose your activity and preferred time slot</p>
            </div>

            <div className="p-6 space-y-8">
              {/* Activity Selection */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 text-sm font-bold">1</span>
                  Select Activity
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.name}
                      onClick={() => setSelectedActivity(activity.name)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedActivity === activity.name
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 shadow-md'
                          : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-400 bg-white dark:bg-gray-700'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-800 dark:text-white">{activity.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{activity.duration}</p>
                      <p className="text-lg font-bold text-orange-600 dark:text-orange-400">₹{activity.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 text-sm font-bold">2</span>
                  Select Date
                </h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-orange-500 focus:outline-none text-lg"
                  placeholder="dd/mm/yyyy"
                />
              </div>

              {/* Time Selection */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 text-sm font-bold">3</span>
                  Select Time Slot
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                        selectedTime === slot
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 shadow-md'
                          : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white'
                      }`}
                    >
                      <Clock className="w-5 h-5 mx-auto mb-2" />
                      <div className="font-medium">{slot}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Selection */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 text-sm font-bold">4</span>
                  Select Workshop Room
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {rooms.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                        selectedRoom === room.id
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 shadow-lg transform scale-105'
                          : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-400 bg-white dark:bg-gray-700'
                      }`}
                    >
                      {/* Room Image - Increased height significantly */}
                      <div className="mb-6 h-70 rounded-lg relative overflow-hidden bg-gray-100 dark:bg-gray-600">
                        {room.id === 'intimate' && (
                          <img 
                            src="/lovable-uploads/Intimate%20Studio.png" 
                            alt="Intimate Studio" 
                            className="w-full h-full object-contain" 
                          />
                        )}
                        {room.id === 'collaborative' && (
                          <img 
                            src="/lovable-uploads/Collaborative%20Space.png" 
                            alt="Collaborative Space" 
                            className="w-full h-full object-contain" 
                          />
                        )}
                        {room.id === 'standard' && (
                          <img 
                            src="/lovable-uploads/Standard%20Workshop.png" 
                            alt="Standard Workshop" 
                            className="w-full h-full object-contain" 
                          />
                        )}
                        <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
                          <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-3">{room.name}</h3>
                        <p className="text-base text-orange-600 dark:text-orange-400 font-semibold mb-4">{room.capacity}</p>
                        <p className="text-base text-gray-600 dark:text-gray-300 mb-5">{room.description}</p>
                        
                        <div className="space-y-3 mb-6">
                          {room.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-base text-gray-500 dark:text-gray-400 justify-center">
                              <div className="w-2.5 h-2.5 bg-green-500 dark:bg-green-400 rounded-full mr-3"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                        
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {room.price === 0 ? 'Free' : `+₹${room.price}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Participants */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 text-sm font-bold">5</span>
                  Number of Participants
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setParticipants(Math.max(1, participants - 1))}
                    className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center font-bold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-gray-800 dark:text-white"
                  >
                    -
                  </button>
                  <span className="text-2xl font-semibold w-12 text-center text-gray-800 dark:text-white">{participants}</span>
                  <button
                    onClick={() => setParticipants(Math.min(10, participants + 1))}
                    className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center font-bold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-gray-800 dark:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 text-sm font-bold">6</span>
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`p-4 rounded-xl border-2 flex items-center space-x-3 transition-all hover:shadow-md ${
                          selectedPayment === method.id
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 shadow-md'
                            : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-400 bg-white dark:bg-gray-700'
                        }`}
                      >
                        <IconComponent className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        <span className="font-medium text-gray-800 dark:text-white">{method.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary and Book Button */}
              {selectedActivityData && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 border border-orange-200 dark:border-orange-600">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Booking Summary</h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>{selectedActivity} × {participants}</span>
                      <span>₹{selectedActivityData.price * participants}</span>
                    </div>
                    {selectedRoomData && selectedRoomData.price > 0 && (
                      <div className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span>{selectedRoomData.name}</span>
                        <span>₹{selectedRoomData.price}</span>
                      </div>
                    )}
                    <div className="border-t border-orange-200 dark:border-orange-600 pt-3 flex justify-between font-bold text-xl text-gray-800 dark:text-white">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleBooking}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Complete Booking - ₹{totalAmount}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;