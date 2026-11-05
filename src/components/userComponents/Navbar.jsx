import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-5 shadow-md bg-white">
                <h2 className="text-2xl font-bold text-green-700"> 🛺 Share Auto</h2>

                <div className="flex items-center gap-8">
                    <Link to="/" className="text-gray-700">Home</Link>
                    <a href="#about" className="text-gray-700">About</a>
                    <a href="#contact" className="text-gray-700">Contact</a>
                    <Link to="/login" className="border border-green-600 text-green-700 px-5 py-2 rounded-lg">Login</Link>
                    <Link to="/register" className="border border-green-600 text-green-700 px-5 py-2 rounded-lg">Sign UP</Link>

                </div>

            </nav>
    </div>
  )
}

export default Navbar
