import React from "react";
import { Link } from "react-router-dom";

function  LandingPage(){
    return(
        <div className="min-h-screen bg-white">

            {/* Hero Section */}

            <section

            id="home" className="bg-green-50 flex flex-col md:flex-row items-center justify-between px-10 py-16">

                <div className="max-w-lg text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-900 leading-tight">
                        <span className="text-green-600">Your Pass!</span>
                    </h1>

                    <p className="text-gray-600 mt-5 text-lg leading-7">
                        Get your digital share auto pass online. and enjoy a simple and comfortable 
                        daily journey.
                    
                    </p>

                       <button className="bg-green-600 text-white px-7 py-3 rounded-lg mt-7 hover:bg-green-700">
                        Get Started
                      </button>

                    </div> 

                    <div className="mt-10 md:mt-0 text-9xl">
                        🛺
                    
                    </div>

            </section>

             {/* Why choose ShareAuto */}
           
            <section className="bg-white py-16 px-8">

                <div className="text-center">
                    <p className="text-green-600 font-semibold upperCase tracking">
                        Why Choose Us
                    </p>

                    <h2 className="text-3xl font-bold text-gray-800 mt-3">
                        Travel Smart with ShareAuto
                    </h2>

                    <p className="text-gray-500 mt-3">

                        Making your everyday travel simple convenient.
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

                    <div className="bg-green-50 p-8 rounded-2xl text-center">
                        <div className="text-5xl">
                            ⚡️
                        </div>

                        <h3 className="text-xl font-bold mt-4">Quick Booking</h3>

                        <p className="text-gray-600 mt-3">
                            Book your digital travel pass easily without complicated steps.

                        </p>
                    </div>
                    <div className="bg-blue-50 p-8 rounded-2xl text-center">

                        <div className="text-5xl">
                            📱

                        </div>

                        <h3 className="text-xl font-bold mt-4">Digital Pass</h3>

                        <p className="text-gray-600 mt-3">
                            Keep your travel pass on your mobile and show it to the driver.

                        </p>

                    </div>

                    <div className="bg-orange-50 p-8 rounded-2xl text-center">
                        <div className="text-5xl">
                            🛺
                        </div>

                        <h3 className="text-xl font-bold mt-4">Easy Verification</h3>
                        <p className="text-gray-600 mt-3">
                            Drivers can verify the passenger's  digital pass easily.
                        </p>
                    </div>
                </div>

            </section>


            {/* How it works */}
            <section id="about" className="py-16 px-8 text-center">

                <h2 className="text-3xl font-bold text-green-800">How It Works</h2>
                <p className="text-gray-500 mt-3">
                    Get your travel pass in three easy steps.

                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-12 max-w-5xl mx-auto">
                    <div className="border rounded-xl p-8 shadow-sm hover:shadow-lg">
                        <h3 className="text-3xl font-bold text-green-600">
                            01
                        </h3>
                        <h4 className="text-xl font-semibold mt-4">
                            Choose Your Pass
                        </h4>
                        <p className="text-gray-500 mt-3">
                            Select the pass that suits your travel needs.

                        </p>
                    </div>

                    <div className="border rounded-xl p-8 shadow-sm hover:shadow-lg">
                        <h3 className="text-3xl font-bold text-green-600">
                            02
                        </h3>
                        <h4 className="text-xl font-semibold mt-4">
                            Make Payment
                        </h4>

                        <p className="text-gray-500 mt-3">
                            Complete your Payment online.

                        </p>

                    </div>

                    <div className="border rounded-xl p-8 shadow-sm hover:shadow-lg">
                        <h3 className="text-3xl font-bold text-green-600">
                            03
                        </h3>
                        <h4 className="text-xl font-semibold mt-4">
                            Get Your Pass
                        </h4>
                        <p className="text-gray-500 mt-3">
                            Show your digital pass and enjoy your journey.
                        </p>
                    </div>


                </div>
        
            </section>

            {/* Our Features */}
            <section className="bg-gray-100 py-16 px-8">

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Everything you need in one place
                    </h2>
                    <p className="text-gray-500 mt-3">
                        A simple digital solution for your daily share auto travel.
                    </p>

                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">

                    <div className="flex gap-5 bg-white p-6 rounded-xl shadow-sm">
                        <span className="text-4xl">
                            🎟️
                        </span>

                        <div>
                            <h3 className="font-bold text-lg">Online Pass Booking</h3>

                            <p className="text-gray-500 mt-2">
                                Book your travel pass through our online platform.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-5 bg-white p-6 rounded-xl shadow-sm">
                        <span className="text-4xl">
                            🎫
                        </span>
                        <div>
                            <h3 className="font-bold text-lg">Easy Payment</h3>
                            <p className="text-gray-500 mt-2">
                                Complete your pass booking with a conveient payment process.
                            </p>
                        </div>

                    </div>
                    <div className="flex gap-5 bg-white p-6 rounded-xl shadow-sm">
                        <span className="text-4xl">
                            📲
                        </span>

                        <div>
                            <h3 className="font-bold text-lg">Mobile Friendly</h3>
                            <p className="text-gray-500 mt-2">
                                Access your digital pass from your mobile device.

                            </p>
                        </div>

                    </div>

                    <div className="flex gap-5 bg-white p-6 rounded-xl shadow-sm">
                        <span className="text-4xl">
                            ☑️
                        </span>

                        <div>
                            <h3 className="font-bold text-lg">Pass Verification</h3>
                            <p className="text-gray-500 mt-2">
                                Show your pass to the driver for verification.
                            </p>
                        </div>
                    </div>
                </div>


            </section>
             
             {/* Start Your Journey */}
            <section className="bg-green-800 text-white text-center py-16 px-6">

                <h2 className="text-3xl md:text-4xl font-bold">
                    Ready to make your Travel Easier?
                </h2>

                <p className="text-green-100 mt-4 text-lg">
                    Get your digital share auto pass and enjoy a simple travel experience.

                </p>
                <button className="bg-white text-green-800 font-semibold px-8 py-3 rounded-lg mt-8 hover:bg-green-100">
                    Get Started 🔜
                </button>


            </section>


            {/* Footer */}
            <footer id="contact" className="bg-green-900 text-white text-center py-8">

                <h2 className="text-2xl font-bold">ShareAuto 🛺</h2>

                <p className="mt-3 text-green-100">Making your Daily Travel Easier.</p>

                <p className="mt-5 text-sm text-green-200">
                    @2026 ShareAuto.All Rights Reserved.

                </p>


            </footer>
        </div>
    )
}
export default LandingPage;