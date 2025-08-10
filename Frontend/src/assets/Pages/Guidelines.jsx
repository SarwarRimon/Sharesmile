import React from 'react';

const Guidelines = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8 animate-gradient-x">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                        Help Request Guidelines
                    </h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
                </div>
                
                <div className="space-y-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/50 to-transparent pointer-events-none"></div>
                    
                    <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-purple-100">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            Document Requirements
                        </h2>
                        <ul className="space-y-3">
                            {[
                                'All supporting documents must be in PDF format',
                                'Documents should be clearly scanned and legible',
                                'Include valid identification documents',
                                'Provide relevant medical records or bills if applicable',
                                'Include any additional supporting documentation that strengthens your case'
                            ].map((item, index) => (
                                <li key={index} className="flex items-center space-x-3 text-gray-700 hover:text-purple-700 transition-colors">
                                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-purple-100">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                            Help Request Process
                        </h2>
                        <ol className="space-y-3">
                            {[
                                'Submit your request with all required documents',
                                'Admin will review your request within 48 hours',
                                'You may be contacted for additional information',
                                'If approved, your request will be converted into a campaign',
                                'You'll be notified of all status changes via the platform'
                            ].map((item, index) => (
                                <li key={index} className="flex items-start space-x-3 text-gray-700 hover:text-purple-700 transition-colors">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-purple-100">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                            Important Notes
                        </h2>
                        <ul className="space-y-3">
                            {[
                                'Be honest and accurate in your request description',
                                'Keep your contact information up to date',
                                'Respond promptly to any admin inquiries',
                                'You can track your request status in "My Requests"',
                                'Contact admin through the platform for any questions'
                            ].map((item, index) => (
                                <li key={index} className="flex items-center space-x-3 text-gray-700 hover:text-purple-700 transition-colors">
                                    <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="mt-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-8 rounded-2xl backdrop-blur-sm border border-purple-100 transform hover:scale-[1.02] transition-all duration-300">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                            Need Help?
                        </h3>
                        <p className="text-gray-700">
                            If you need any assistance or have questions about the process, 
                            please don't hesitate to contact our admin team through the Contact Admin section.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guidelines;
