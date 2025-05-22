'use client'

import Nav from "@/components/nav";
import DBTables from "@/components/DBTables";
import { useState } from 'react';

const Index = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-900">
            {/* sidebar nav */}
            <div className="w-64 border-r border-gray-800 bg-gray-900">
                <Nav />
            </div>

            {/* main content */}
            <div className="flex-1 overflow-auto">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    {/* page header and admin toggle */}
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-100">Main Page</h1>
                            <p className="mt-2 text-gray-400">View data</p>
                        </div>
                        
                        {/* Admin mode toggle (temporary - will replace with login later) */}
                        <div className="flex items-center">
                            <span className="mr-3 text-sm font-medium text-gray-300">
                                Admin Mode
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    checked={isAdmin}
                                    onChange={() => setIsAdmin(!isAdmin)}
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>

                    {/* content area */}
                    <div className="rounded-lg shadow-lg p-6 border border-gray-700 bg-gray-800">
                        <DBTables isAdmin={isAdmin} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;