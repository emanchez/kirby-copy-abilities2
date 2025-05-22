const Nav = () => {
    return (
      <div className="p-4 h-full flex flex-col bg-gray-900 border-r border-gray-800">
        {/* Sidebar header */}
        <div className="mb-6 pb-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-gray-200">Kirby's Copy Abilities</h2>
        </div>
  
        {/* Navigation links */}
        <ul className="space-y-2 flex-1">
          <li>
            <a 
              href="/index" 
              className="block px-4 py-2 rounded-lg text-gray-300 no-underline hover:bg-gray-800 hover:text-indigo-400 transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="/info" 
              className="block px-4 py-2 rounded-lg text-gray-300 no-underline hover:bg-gray-800 hover:text-indigo-400 transition-colors"
            >
              Info
            </a>
          </li>
          <li>
            <a 
              href="/tables" 
              className="block px-4 py-2 rounded-lg text-gray-300 no-underline hover:bg-gray-800 hover:text-indigo-400 transition-colors"
            >
              Tables
            </a>
          </li>
        </ul>
  
        {/* Footer */}
        <div className="pt-4 mt-auto border-t border-gray-800 text-sm text-gray-500">
          Wiki Navigation
        </div>
      </div>
    );
  };
  
  export default Nav;