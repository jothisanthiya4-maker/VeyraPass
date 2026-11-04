import React from "react";
import { Link } from "react-router-dom";

function  LandingPage(){
    return(
        <div className="min-h-screen bg-white">

            <nav className="flex justify-between items-center px-8 py-5 shadow-md bg-white">
                <h2 className="text-2xl font-bold text-green-700">Share Auto</h2>

                <div className="flex items-center gap-8">
                    <Link to="/" className="text-gray-700">Home</Link>
                    <a href="#about" className="text-gray-700">About</a>
                    <a href="#contact" className="text-gray-700">Contact</a>
                    <Link to="/login" className="border border-green-600 text-green-700 px-5 py-2 rounded-lg">Login</Link>
                    <Link to="/register" className="border border-green-600 text-green-700 px-5 py-2 rounded-lg">Sign UP</Link>

                </div>

            </nav>
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

            {/* Footer */}
            <footer id="contact" className="bg-green-900 text-white text-center py-8">

                <h2 className="text-2xl font-bold">ShareAuto</h2>

                <p className="mt-3 text-green-100">Making your Daily Travel Easier.</p>

                <p className="mt-5 text-sm text-green-200">
                    @2026 ShareAuto.All Rights Reserved.

                </p>

            </footer>
        </div>
    )
}
export default LandingPage;