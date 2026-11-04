


function RideDetails() {
  const driver = {
    name: "Raj Kumar",
    rating: 4.8,
    reviews: 120,
    vehicle: "Bajaj RE",
    registration: "TN 09 AB 1234",
    vehicleType: "Shared Auto",
    seatingCapacity: 4,
  };

  const requestedSeats = 2;
  const farePerSeat = 40;
  const totalFare = requestedSeats * farePerSeat;

  return (
    <div className="min-h-screen bg-green-950 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Page Heading */}

        <h1 className="text-3xl font-bold text-white mb-2">
          Ride Details
        </h1>

        <p className="text-green-200 mb-8">
          Complete information about your selected auto ride
        </p>

        {/* Driver Information */}

        <div className="bg-lime-200 border border-amber-400 rounded-xl p-6 mb-6 shadow-lg">

          <h2 className="text-xl font-bold  mb-4">
            Driver Information
          </h2>

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-green-700 text-white flex items-center justify-center text-2xl font-bold">
              RK
            </div>

            <div>

              <h3 className="text-lg font-semibold ">
                {driver.name}
              </h3>

              <p className="text-green-700">
                ⭐ {driver.rating} ({driver.reviews} Reviews)
              </p>

              <span className="text-amber-700 text-sm font-medium">
                ✓ Verified Driver
              </span>

            </div>

          </div>

        </div>

        {/* Vehicle Information */}

        <div className="bg-amber-100 border-amber-400 border  rounded-xl p-6 mb-6 shadow-lg">

          <h2 className="text-xl font-bold  mb-4">
            Vehicle Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
            <div>

              <p className="text-gray-500 text-sm">Vehicle Model</p>
             
              <p className=" font-semibold">{driver.vehicle}</p>
            
            </div>

            <div>

              <p className="text-gray-500 text-sm">Registration Number</p>
              
              <p className=" font-semibold">
                {driver.registration}
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">Vehicle Type</p>
             
              <p className=" font-semibold">
                {driver.vehicleType}
              </p>

            </div>

            <div>

              <p className="text-gray-500 text-sm">Seating Capacity</p>
              
              <p className=" font-semibold">
                {driver.seatingCapacity} Seats
              </p>

            </div>

          </div>

        </div>

        {/* Route Information */}

        <div className="bg-amber-100 border-amber-400 border rounded-xl p-6 mb-6 shadow-lg">
         
          <h2 className="text-xl font-bold mb-4">
            Route Information
          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-3">
             
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
             
              <div>
                <p className="text-green-900 text-sm">Pickup Location</p>
               
                <p className=" font-semibold">
                  Chennai Central
                </p>

              </div>

            </div>

            <div className="ml-1 border-l-2 border-dashed border-green-600 h-8"></div>

            <div className="flex items-center gap-3">
             
              <span className="w-3 h-3 rounded-full bg-green-300"></span>
              
              <div>
              
                <p className="text-green-900 text-sm">Intermediate Stop</p>
               
                <p className=" font-semibold">Egmore</p>
             
              </div>
          
            </div>

            <div className="ml-1 border-l-2 border-dashed border-green-600 h-8"></div>

            <div className="flex items-center gap-3">
             
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
             
              <div>
              
                <p className="text-green-900 text-sm">Destination</p>
               
                <p className=" font-semibold">T. Nagar</p>
              
              </div>
           
            </div>
         
          </div>
      
        </div>

        {/* Seat Availability */}
        <div className="bg-amber-100 border-amber-400 border  rounded-xl p-6 mb-6 shadow-lg">
         
          <h2 className="text-xl font-bold mb-4">
            Seat Availability
          </h2>

          <div className="grid grid-cols-3 gap-3 text-center ">
          
            <div className="bg-green-500 rounded-lg p-4 ">
             
              <p className="text-sm">Total Seats</p>
             
              <p className="text-2xl font-bold ">4</p>
            
            </div>

            <div className="bg-green-500 rounded-lg p-4">
             
              <p className=" text-sm">Reserved</p>
              <p className="text-2xl font-bold ">2</p>
            
            </div>

            <div className="bg-green-500 rounded-lg p-4">
              
              <p className=" text-sm">Available</p>
              <p className="text-2xl font-bold ">2</p>
           
            </div>
          </div>

          <p className="text-green-300 mt-4 text-sm">
            ✓ Enough seats are available for your booking.
          </p>
        
        </div>

        {/* Fare Details */}
        <div className="bg-amber-100 border-amber-400 border rounded-xl p-6 mb-6 shadow-lg">
         
          <h2 className="text-xl font-bold mb-4">
            Fare Breakdown
          </h2>

          <div className="flex justify-between text-green-700 mb-3">
           
            <p>Fare per passenger</p>
            <p>₹{farePerSeat}</p>
          
          </div>

          <div className="flex justify-between text-green-700 mb-3">
           
            <p>Number of seats</p>
            <p>{requestedSeats}</p>
        
          </div>

          <div className="border-t border-green-700 pt-4 flex justify-between">
           
            <p className=" font-bold">Total Fare</p>
            <p className="text-2xl font-bold text-green-400">
              ₹{totalFare}
            </p>
         
          </div>
       
        </div>

        {/* Departure Schedule */}
        <div className="  bg-amber-100 border-amber-400 border  rounded-xl p-6 mb-6 shadow-lg">
         
          <h2 className="text-xl font-bold text-black mb-4">
            Departure Schedule
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
            <div>
              <p className="text-green-700 text-sm">Departure Time</p>
              <p className="text-black font-semibold">10:30 AM</p>
            
            </div>

            <div>
             
              <p className="text-green-700 text-sm">Expected Waiting Time</p>
              <p className="text-black font-semibold">10 Minutes</p>
            
            </div>
          </div>
        </div>

        {/* Ride Policy */}
        <div className="bg-amber-100 border-amber-400 border rounded-xl p-6 mb-6 shadow-lg">
         
          <h2 className="text-xl font-bold text-black mb-4">
            Ride Policy
          </h2>

          <ul className="list-disc pl-5 space-y-2 text-black ">
           
            <li>Passengers should arrive at the pickup location on time.</li>
            <li>Follow the driver's safety instructions.</li>
            <li>Maintain cleanliness inside the vehicle.</li>
            <li>Booking cancellation is subject to the cancellation policy.</li>
         
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
         
          <button className="flex-1 bg-green-200 text-block font-bold py-3 rounded-lg hover:bg-green-500 transition">
            Book Now
          </button>

          <button className="flex-1 border border-green-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition">
            Add to Compare
          </button>
       
        </div>

      </div>
    </div>
  );
}

export default RideDetails;
