import Nav from "@/components/nav"
const Blog = () => {
    return (
        <div className="min-h-screen flex">
            {/* sidebar nav */}
            <div className="w-64 border-r border-gray-200 shadow-sm">
                <Nav />
            </div>

            {/* main content */}
            <div className="flex-1 overflow-auto">
                <div className="max-w-6x1 mx-auto px-6 py-8">
                    {/* page header */}
                    <div className="mb-8">
                        <h1 className="text-3x1 font-bold">Info</h1>
                        <p className="mt-2">This site is to show my ability to make a wiki site using NextJS and dexie indexedDB</p>
                    </div>

                </div>

            </div>
            
        </div>
    );
}

export default Blog;