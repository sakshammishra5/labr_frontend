import Search from '@/components/Search'
import React from 'react'

const HomePage = () => {
    return (
        
            <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 font-sans">
                {/* <!-- Header (Hero Section) --> */}
                <header className="relative">
                    <div className="pt-24 pb-16 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Find Trusted Labor Contractors Near You</h2>
                        <p className="text-lg md:text-xl text-gray-600 mt-2">Hire skilled workers for house building, painting, plumbing, and more.</p>
                        <div className='flex justify-center items-center'>
                          <Search/>
                        </div>
                    </div>
                </header>

                {/* <!-- Services Section --> */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto">
                        <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">What We Offer</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6  -4">
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg text-center">
                                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1h3a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1h3V3a1 1 0 011-1z" /></svg>
                                </div>
                                <h4 className="text-xl font-semibold mt-4">House Building</h4>
                                <p className="text-gray-600 mt-2">Expert contractors for construction.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg text-center">
                                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 2h16v16H2V2zm2 2v12h12V4H4z" /></svg>
                                </div>
                                <h4 className="text-xl font-semibold mt-4">Painting</h4>
                                <p className="text-gray-600 mt-2">Professional painters for any job.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg text-center">
                                <div className="w-12 h-12 mx-auto bg-blue-200 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 00-8 8c0 4.42 3.58 8 8 8s8-3.58 8-8a8 8 0 00-8-8z" /></svg>
                                </div>
                                <h4 className="text-xl font-semibold mt-4">Plumbing</h4>
                                <p className="text-gray-600 mt-2">Fix leaks, install pipes, and more.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg text-center">
                                <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2l-8 8h6v8h4v-8h6l-8-8z" /></svg>
                                </div>
                                <h4 className="text-xl font-semibold mt-4">Electrical Work</h4>
                                <p className="text-gray-600 mt-2">Safe and reliable electricians.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- How It Works Section --> */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto">
                        <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">How It Works</h3>
                        <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center border-2 border-green-500">
                                    <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M8 8a3 3 0 100-6 3 3 0 000 6zm7 7a5 5 0 00-10 0h10z" /></svg>
                                </div>
                                <p className="mt-4 text-gray-600">1. Search your location and service.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center border-2 border-green-500">
                                    <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l-4-4h8l-4 4z" /></svg>
                                </div>
                                <p className="mt-4 text-gray-600">2. Choose from verified contractors.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center border-2 border-green-500">
                                    <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 00-8 8h16a8 8 0 00-8-8z" /></svg>
                                </div>
                                <p className="mt-4 text-gray-600">3. Hire with confidence.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- CTA Section --> */}
                <section className="bg-green-500 py-16 text-center text-white">
                    <h3 className="text-3xl font-bold">Ready to Find a Contractor?</h3>
                    <p className="text-lg mt-2">Get started now and connect with local experts.</p>
                    <button className="mt-6 bg-white text-green-500 px-6 py-3 rounded-lg font-semibold shadow-md">Search Now</button>
                </section>

                {/* <!-- Footer --> */}
                <footer className="bg-gray-800 text-white p-4 text-center">
                    <p>© 2025 LaborFinder. All rights reserved.</p>
                </footer>
            </div>
    )
}

export default HomePage
