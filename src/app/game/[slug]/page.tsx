import Nav from "@/components/nav"
import GameData from "@/components/GameData"

async function Game({ params, }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
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
                        <h1 className="text-3x1 font-bold">Game Page</h1>
                        <p className="mt-2">information for game: {slug}</p>
                    </div>

                </div>
                {/* content area */}
                <div className="rounded-lg shadow-sm p-6 border border-gray-200">
                    <GameData gameId={parseInt(slug)} />
                </div>

            </div>
        </div>
    );
}

export default Game;