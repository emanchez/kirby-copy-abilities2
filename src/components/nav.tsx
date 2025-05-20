const Nav = () => {
    return (
        <div className="p-4 h-full flex flex-col">
            {/* sidebar header */}
            <div className="mb-6 pb-4 border-b border-gray-200">
             <h2 className="text-x1 font-bold text-white">Kirby's Copy Abilities</h2>
            </div>

            {/* nav links */}
            <ul className="space-y-2 flex-1">
                <li><a href="/index" className="block px-4 py-2 rounded-lg text-white hover:bg-white hover:text-black transition-colors">Home</a></li>
                <li><a href="/info" className="block px-4 py-2 rounded-lg text-white hover:bg-white hover:text-black transition-colors">Info</a></li>
                <li><a href="/admin" className="block px-4 py-2 rounded-lg text-white hover:bg-white hover:text-black transition-colors">Admin Mode</a></li>
            </ul>

            {/* nav footer */}
            <div className="pt-4 mt-auto border-t border-gray-200 text-sm text-gray-500">
                Navigation
            </div>
        </div>
    )
}

export default Nav;