import { useState, useEffect, useMemo } from 'react';
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
  const [selectedCombo, setSelectedCombo] = useState<{ id: string; name: string; price: number; type: 'specific' | 'any' | 'special'; limit?: number; activities?: string[]; } | null>(null);
  const [selectedIndividualActivities, setSelectedIndividualActivities] = useState<string[]>([]);
  const [selectedHour24, setSelectedHour24] = useState(9); // 24-hour format: 9 (9 AM) to 19 (7 PM for 2-hour slot ending by 9 PM)
  const [selectedMinute, setSelectedMinute] = useState(0);

  const activities = [
    { name: "Tufting", price: 0, duration: "2 hours" },
    { name: "Jewelry Making", price: 0, duration: "2 hours" },
    { name: "Block Printing", price: 0, duration: "2 hours" },
    { name: "Eco Printing", price: 0, duration: "2 hours" },
    { name: "Noted", price: 0, duration: "2 hours" },
    { name: "Protector", price: 0, duration: "2 hours" },
    { name: "Plushie heaven", price: 0, duration: "2 hours" },
    { name: "Magnetic world", price: 0, duration: "2 hours" },
    { name: "Jewellery Lab", price: 2499, duration: "2 people" },
    { name: "Tufting Experience", price: 1999, duration: "1 frame" }
  ];

  const comboOptions = [
    { id: 'combo1', name: 'Plushie heaven + Magnetic world', price: 899, type: 'specific', activities: ['Plushie heaven', 'Magnetic world'] },
    { id: 'combo2', name: 'Plushie heaven, Protector, Noted, Magnetic world', price: 1499, type: 'specific', activities: ['Plushie heaven', 'Protector', 'Noted', 'Magnetic world'] },
    { id: 'combo3', name: 'Any two activities', price: 799, type: 'any', limit: 2 },
    { id: 'combo4', name: 'Any three activities', price: 1099, type: 'any', limit: 3 },
    { id: 'jewellery_lab', name: 'Jewellery Lab', price: 2499, type: 'special' },
    { id: 'tuft_kidding', name: 'Tufting Experience', price: 1999, type: 'special' }
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
      const specialCombo = comboOptions.find(c => c.name === activity && c.type === 'special');
      if (specialCombo) {
        setSelectedCombo(specialCombo);
        setSelectedIndividualActivities([]);
      } else {
        setSelectedIndividualActivities([activity]);
        setSelectedCombo(null);
      }
    }
  }, []);

  const getActivitiesInCurrentSelection = useMemo(() => {
    const chosenActivities = new Set<string>();
    let basePrice = 0;

    if (selectedCombo) {
        basePrice = selectedCombo.price;
        if (selectedCombo.type === 'specific' && selectedCombo.activities) {
            selectedCombo.activities.forEach(name => chosenActivities.add(name));
        }
    }

    selectedIndividualActivities.forEach(name => chosenActivities.add(name));

    return { chosenActivityNames: Array.from(chosenActivities), basePrice };
}, [selectedCombo, selectedIndividualActivities]);

const allSelectedActivitiesDetailed = useMemo(() => {
    return getActivitiesInCurrentSelection.chosenActivityNames
        .map(name => activities.find(act => act.name === name))
        .filter(Boolean) as typeof activities; 
}, [getActivitiesInCurrentSelection.chosenActivityNames, activities]);

  const selectedActivityData = activities.find(a => a.name === selectedActivity);
  const selectedRoomData = rooms.find(r => r.id === selectedRoom);

  const totalAmount = useMemo(() => {
    let currentTotal = getActivitiesInCurrentSelection.basePrice;

    allSelectedActivitiesDetailed.forEach(activity => {
        const isCoveredBySpecificCombo = selectedCombo && selectedCombo.type === 'specific' && selectedCombo.activities && selectedCombo.activities.includes(activity.name);
        const isSpecialActivitySelectedDirectly = !selectedCombo && activity.price > 0;

        if (!isCoveredBySpecificCombo && isSpecialActivitySelectedDirectly) {
            currentTotal += activity.price;
        }
    });

    currentTotal += (selectedRoomData?.price || 0);

    return currentTotal;
}, [getActivitiesInCurrentSelection.basePrice, allSelectedActivitiesDetailed, selectedRoomData, selectedCombo]);

  // Helper function to format hour for display (12-hour format) and determine meridiem
  const formatHour = (hour24: number) => {
    let displayHour = hour24;
    let meridiem = 'AM';
    if (hour24 >= 12) {
      meridiem = 'PM';
      if (hour24 > 12) {
        displayHour = hour24 - 12;
      }
    } else if (hour24 === 0) { // Should not happen with 9-19 range, but good practice
      displayHour = 12;
    }
    return { displayHour, meridiem };
  };

  // Helper function to format minutes for display
  const formatMinute = (minute: number) => {
    return minute.toString().padStart(2, '0');
  };

  // Effect to update selectedTime string for display
  useEffect(() => {
    const startHourInfo = formatHour(selectedHour24);
    const endHour24 = selectedHour24 + 2;
    const endHourInfo = formatHour(endHour24 > 21 ? 21 : endHour24); // Cap end time at 9 PM (21)

    const formattedStartMinute = formatMinute(selectedMinute);
    let formattedEndMinute = formattedStartMinute; // Assuming minutes don't change over the 2-hour slot

    setSelectedTime(
      `$\{startHourInfo.displayHour}:${formattedStartMinute} $\{startHourInfo.meridiem} - ` +
      `$\{endHourInfo.displayHour}:${formattedEndMinute} $\{endHourInfo.meridiem}`
    );
  }, [selectedHour24, selectedMinute]);

  const handleHourIncrement = (increment: number) => {
    setSelectedHour24(prevHour => {
      let newHour = prevHour + increment;
      // Keep within 9 AM (9) to 7 PM (19) for start hour (ensures 2-hour slot ends by 9 PM)
      if (newHour < 9) {
        return 19; // Loop back from 9 AM to 7 PM
      } else if (newHour > 19) {
        return 9; // Loop forward from 7 PM to 9 AM
      }
      return newHour;
    });
  };

  const handleMinuteIncrement = (increment: number) => {
    setSelectedMinute(prevMinute => {
      let newMinute = prevMinute + increment;
      if (newMinute >= 60) {
        newMinute = 0;
      } else if (newMinute < 0) {
        newMinute = 45;
      }
      return newMinute;
    });
  };

  const handleHourInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      return; // Don't update if not a number
    }

    let newHour24 = value;
    const currentMeridiem = formatHour(selectedHour24).meridiem;

    if (value === 12) { // User typed 12
      if (currentMeridiem === 'AM') newHour24 = 0; // This will be clamped to 9 AM later
      else newHour24 = 12; // 12 PM
    } else if (currentMeridiem === 'PM' && value >= 1 && value <= 11) {
      newHour24 = value + 12;
    } else if (currentMeridiem === 'AM' && value >= 1 && value <= 11) {
      newHour24 = value;
    }
    
    setSelectedHour24(newHour24);
  };

  const handleHourInputBlur = () => {
    setSelectedHour24(prevHour => {
      let newHour = prevHour;
      // Clamp to 9 AM (9) to 7 PM (19)
      if (newHour < 9) newHour = 9;
      if (newHour > 19) newHour = 19;

      // Special case: if user typed 12 AM (0) and then shifted to AM, it should be 9 AM
      if (formatHour(newHour).displayHour === 12 && formatHour(newHour).meridiem === 'AM' && newHour === 0) {
          newHour = 9; // Clamp 12 AM (0) to 9 AM (minimum allowed)
      }
      return newHour;
    });
  };

  const handleMinuteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      return; // Don't update if not a number
    }
    setSelectedMinute(value); // Temporarily set minute, rounding will happen onBlur
  };

  const handleMinuteInputBlur = () => {
    setSelectedMinute(prevMinute => {
      let newMinute = prevMinute;
      // Clamp 0-59
      if (newMinute < 0) newMinute = 0;
      if (newMinute > 59) newMinute = 59;
      // Round to nearest 15
      newMinute = Math.round(newMinute / 15) * 15;
      if (newMinute === 60) newMinute = 0; // Handle rounding up to 60 minutes

      return newMinute;
    });
  };

  const handleMeridiemToggle = (targetMeridiem: 'AM' | 'PM') => {
    setSelectedHour24(prevHour => {
      const currentMeridiem = prevHour >= 12 && prevHour <= 19 ? 'PM' : 'AM'; // Adjusted PM check for allowed range

      if (targetMeridiem === 'AM' && currentMeridiem === 'PM') {
        // If currently PM and switching to AM
        let newHour = prevHour - 12;
        if (newHour < 9) newHour = 9; // Ensure it's within allowed range
        return newHour;
      } else if (targetMeridiem === 'PM' && currentMeridiem === 'AM') {
        // If currently AM and switching to PM
        let newHour = prevHour + 12;
        if (newHour > 19) newHour = 19; // Ensure it's within allowed range
        return newHour;
      }
      return prevHour; // No change if already in target meridiem or logic doesn't apply
    });
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedPayment || !selectedRoom) {
      alert('Please fill in all required fields');
      return;
    }

    if (!selectedCombo && allSelectedActivitiesDetailed.length === 0) {
        alert('Please select an activity or a combo.');
        return;
    }

    if (selectedCombo && selectedCombo.type === 'any' && allSelectedActivitiesDetailed.length !== selectedCombo.limit) {
        alert(`Please select exactly ${selectedCombo.limit} activities for your combo.`);
        return;
    }

    setShowConfirmation(true);
  };

  const handleComboSelect = (combo: typeof comboOptions[number]) => {
    setSelectedCombo(combo);
    setSelectedIndividualActivities([]);
  };

  const handleActivitySelect = (activityName: string) => {
    if (selectedCombo && (selectedCombo.type === 'specific' || selectedCombo.type === 'special')) {
        alert('You cannot select individual activities when a specific or special combo is chosen.');
        return;
    }

    setSelectedIndividualActivities(prev => {
        const isAlreadySelected = prev.includes(activityName);
        let newSelection = isAlreadySelected
            ? prev.filter(name => name !== activityName)
            : [...prev, activityName];

        if (selectedCombo && selectedCombo.type === 'any' && selectedCombo.limit) {
            if (newSelection.length > selectedCombo.limit) {
                alert(`You can only select up to ${selectedCombo.limit} activities with this combo.`);
                return prev;
            }
        }
        return newSelection;
    });
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
                <p><strong>Activity:</strong> {selectedCombo ? selectedCombo.name : allSelectedActivitiesDetailed.map(a => a.name).join(', ') || 'None'}</p>
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
              {/* Combo Selection */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 text-sm font-bold">1</span>
                  Select Your Combo or Special Activity
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {comboOptions.map((combo) => (
                    <div
                      key={combo.id}
                      onClick={() => handleComboSelect(combo)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedCombo?.id === combo.id
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 shadow-md'
                          : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-400 bg-white dark:bg-gray-700'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-800 dark:text-white">{combo.name}</h3>
                      <p className="text-lg font-bold text-orange-600 dark:text-orange-400">₹{combo.price}</p>
                      {combo.duration && <p className="text-sm text-gray-600 dark:text-gray-300">{combo.duration}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Selection */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 text-sm font-bold">2</span>
                  Select Activity
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">*Please note: Every activity is designed for 2 people only.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activities.map((activity) => {
                    const isSelectedBySpecificCombo = selectedCombo && selectedCombo.type === 'specific' && selectedCombo.activities?.includes(activity.name);
                    const isSelectedByIndividual = selectedIndividualActivities.includes(activity.name);
                    let isSelected = isSelectedBySpecificCombo || isSelectedByIndividual;

                    let localIsDisabled = false;
                    const isSpecialActivityInActivitiesList = activity.price > 0; // Refers to the individual "Jewellery Lab" and "Tufting Experience" in the activities array

                    // If no combo is selected, disable all individual activities by default.
                    if (!selectedCombo) {
                        localIsDisabled = true;
                        isSelected = false; // Ensure no default selection is visible
                    }
                    // Prioritize disabling if a special or specific combo is chosen
                    else if (selectedCombo.type === 'special' || selectedCombo.type === 'specific') {
                        localIsDisabled = true;
                        isSelected = false; // Explicitly ensure it's not considered selected visually
                    }
                    // If an "any" type combo is selected and the limit is reached, disable non-selected activities.
                    else if (selectedCombo.type === 'any' && selectedCombo.limit) {
                        if (selectedIndividualActivities.length >= selectedCombo.limit && !isSelectedByIndividual) { // Use isSelectedByIndividual here
                            localIsDisabled = true;
                        }
                    }
                    // If no combo is selected, disable individual "special" activities as they must be picked via their combo option.
                    // This condition is now implicitly covered by the first `if (!selectedCombo)` block.
                    // else if (!selectedCombo && isSpecialActivityInActivitiesList) {
                    //     localIsDisabled = true;
                    // }

                    // Determine the final class based on selection and disabled state
                    let activityClasses = '';
                    if (localIsDisabled) {
                        activityClasses = 'opacity-50 cursor-not-allowed border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800'; // Greyed out and unclickable
                    } else if (isSelected) {
                        activityClasses = 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 shadow-md'; // Selected style
                    } else {
                        activityClasses = 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-400 bg-white dark:bg-gray-700'; // Default style
                    }

                    return (
                      <div
                        key={activity.name}
                        onClick={() => !localIsDisabled && handleActivitySelect(activity.name)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                          activityClasses
                        }`}
                      >
                        <h3 className="font-semibold text-gray-800 dark:text-white">{activity.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{activity.duration}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 text-sm font-bold">3</span>
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
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 text-sm font-bold">4</span>
                  Select Time Slot
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">Open from 9 AM to 9 PM</p>
                <div className="flex items-center justify-center space-x-4 bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-600">
                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    <span className="mb-2 text-sm text-gray-600 dark:text-gray-300">Hours</span>
                    <div className="relative w-24 h-28 flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 overflow-hidden">
                      <button
                        onClick={() => handleHourIncrement(1)}
                        className="absolute top-0 inset-x-0 h-1/3 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 text-2xl font-bold cursor-pointer transition-colors"
                      >
                        ▲
                      </button>
                      <input
                        type="number"
                        value={formatHour(selectedHour24).displayHour}
                        onChange={handleHourInputChange}
                        onBlur={handleHourInputBlur}
                        className="text-4xl font-bold text-gray-800 dark:text-white text-center w-full bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        min="1"
                        max="12"
                      />
                      <button
                        onClick={() => handleHourIncrement(-1)}
                        className="absolute bottom-0 inset-x-0 h-1/3 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 text-2xl font-bold cursor-pointer transition-colors"
                      >
                        ▼
                      </button>
                    </div>
                  </div>

                  <span className="text-4xl font-bold text-gray-800 dark:text-white">:</span>

                  {/* Minutes */}
                  <div className="flex flex-col items-center">
                    <span className="mb-2 text-sm text-gray-600 dark:text-gray-300">Minutes</span>
                    <div className="relative w-24 h-28 flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 overflow-hidden">
                      <button
                        onClick={() => handleMinuteIncrement(15)}
                        className="absolute top-0 inset-x-0 h-1/3 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 text-2xl font-bold cursor-pointer transition-colors"
                      >
                        ▲
                      </button>
                      <input
                        type="number"
                        value={formatMinute(selectedMinute)}
                        onChange={handleMinuteInputChange}
                        onBlur={handleMinuteInputBlur}
                        className="text-4xl font-bold text-gray-800 dark:text-white text-center w-full bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        min="0"
                        max="59"
                      />
                      <button
                        onClick={() => handleMinuteIncrement(-15)}
                        className="absolute bottom-0 inset-x-0 h-1/3 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 text-2xl font-bold cursor-pointer transition-colors"
                      >
                        ▼
                      </button>
                    </div>
                  </div>

                  {/* AM/PM buttons */}
                  <div className="flex flex-col space-y-2 ml-4 h-28 justify-center">
                    <button
                      onClick={() => handleMeridiemToggle('AM')}
                      className={`py-3 px-6 rounded-full border-2 transition-all text-base font-medium ${
                        formatHour(selectedHour24).meridiem === 'AM'
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 shadow-md'
                          : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-400 bg-white dark:bg-gray-700'
                      }`}
                    >
                      AM
                    </button>
                    <button
                      onClick={() => handleMeridiemToggle('PM')}
                      className={`py-3 px-6 rounded-full border-2 transition-all text-base font-medium ${
                        formatHour(selectedHour24).meridiem === 'PM'
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 shadow-md'
                          : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-400 bg-white dark:bg-gray-700'
                      }`}
                    >
                      PM
                    </button>
                  </div>
                </div>
              </div>

              {/* Room Selection */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 text-sm font-bold">5</span>
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

              {/* Payment Method */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-white">
                  <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3 text-sm font-bold">7</span>
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
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 border border-orange-200 dark:border-orange-600">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Booking Summary</h3>
                  <div className="space-y-2 mb-6">
                  {selectedCombo && (
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>{selectedCombo.name}</span>
                      <span>₹{selectedCombo.price}</span>
                    </div>
                  )}
                  {selectedIndividualActivities.length > 0 && (
                    allSelectedActivitiesDetailed
                      .filter(activity => {
                          const isSpecialActivity = activity.price > 0;
                          const isCoveredBySpecificCombo = selectedCombo && selectedCombo.type === 'specific' && selectedCombo.activities?.includes(activity.name);

                          // Only show special activities that are NOT part of a specific combo.
                          // Activities with price 0 (general activities in 'any' combos) should NOT be listed here individually.
                          return isSpecialActivity && !isCoveredBySpecificCombo;
                      })
                      .map((activity, index) => (
                        <div key={index} className="flex justify-between text-gray-700 dark:text-gray-300">
                          <span>{activity.name}</span>
                          <span>₹{activity.price}</span>
                        </div>
                      ))
                  )}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;