import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../Logo'
import { useState } from 'react';


function Footer() {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {

    e.preventDefault();
    if (email.trim()) {
      console.log('Subscribing email:', email);
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    }

  };
  
  return (
    
    <section className="relative overflow-hidden py-12 bg-[#06202B] border-t-2 border-t-black ">

            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">

                {/* left part of footer */}

                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">

                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>

                            {/* Newsletter Subscription */}

                            <div className="mb-6">

                                <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-white">
                                    Subscribe to Newsletter
                                </h3>
                                <p className="text-sm text-gray-400 mb-4">
                                    Get the latest updates and insights delivered to your inbox.
                                </p>

                                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        Subscribe
                                    </button>

                                </form>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">
                                    &copy; Copyright 2023. All Rights Reserved by Terminal Talks.
                                </p>
                            </div>

                        </div>

                    </div>

                {/* right part of footer  */}

                    <div className="w-full p-6 md:w-1/2 lg:w-2/12 ">

                        <div className="h-full">

                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white">
                                Company
                            </h3>

                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-white hover:text-gray-400"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-white hover:text-gray-400"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-white hover:text-gray-400"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-white hover:text-gray-400"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>

                            </ul>

                        </div>
                    </div>

                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">

                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white">
                                Support
                            </h3>

                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-white hover:text-gray-400"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-white hover:text-gray-400"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-white hover:text-gray-400"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-white hover:text-gray-400"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>

                        </div>
                    </div>

                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">

                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white">
                                Legals
                            </h3>

                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-white hover:text-gray-400"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-white hover:text-gray-400"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-white hover:text-gray-400"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>
            </div>

        </section>

  )
}

export default Footer