
import React from 'react';
import { MapPin, Clock, Star, CreditCard, History } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleSuccess , handleError } from '../utils'; // Assuming you have a utility for handling notifications

const PassengerDashboard = () => {

  const [rideData, setRideData] = useState({
    name: '',
    email: '',
    phone : '',
    pickupLocation: '',
    dropLocation: ''
  });

  // On component mount, populate name & email from localStorage
useEffect(() => {
  const name = localStorage.getItem('name') || '';
  const email = localStorage.getItem('email') || '';
  const phone = localStorage.getItem('phone') || '';

  setRideData((prevData) => ({
    ...prevData,
    name,
    email,
    phone
  }));
}, []);

  console.log(localStorage.getItem('name'));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRideData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  console.log('Ride Data:', rideData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3000/passenger/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // if using middleware
        },
        body: JSON.stringify(
          {
            name: rideData.name,
            email: rideData.email,
            phone : rideData.phone,
            pickupLocation: rideData.pickupLocation,
            dropLocation: rideData.dropLocation
          }
        )
      });

      const result = await response.json();
      console.log('Ride created:', result);
      if(response.ok) {
        // Clear form fields
        setRideData({
          name: rideData.name,
          email: rideData.email,
          phone : rideData.phone,
          pickupLocation: '',
          dropLocation: ''
        });
        // Show success message
        handleSuccess('Ride booked successfully!');
      } else {
        handleError(result.message || 'Failed to book ride');
      }
    } catch (err) {
      console.error('Error submitting ride:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Passenger Dashboard</h1>
          <p className="text-gray-600 mt-2">Book your next ride or manage your trips</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6" >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Book a Ride</h2>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                    <input
                      type="text"
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter pickup location"
                      onChange={handleInputChange}
                      name="pickupLocation"
                      value={rideData.pickupLocation}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                    <input
                      type="text"
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Where to?"
                      onChange={handleInputChange}
                      name="dropLocation"
                      value={rideData.dropLocation}
                    />
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  type='submit'>
                  Find Rides
                </button>
              </form>
            </div>

            {/* Current Trip */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Trip</h2>
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No active trips</p>
                <p className="text-sm text-gray-400">Your current ride will appear here</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Trips</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold ml-1">4.8</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Money Saved</span>
                  <span className="font-semibold text-green-600">$142</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 1234</p>
                  <p className="text-sm text-gray-600">Expires 12/25</p>
                </div>
              </div>
            </div>

            {/* Recent Trips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Trips</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <History className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Downtown → Airport</p>
                    <p className="text-xs text-gray-600">2 days ago • $25.50</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <History className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Home → Mall</p>
                    <p className="text-xs text-gray-600">5 days ago • $12.30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <ToastContainer />
      </div>
    </div>
  );
};


export default PassengerDashboard;
