import Nav from "@/components/nav"

async function Game({ params, }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    return (
        <div>
            <Nav />
            <div>
                <h1>Game Page</h1>
            </div>
            <div>
                Game ID: {slug}
            </div>
        </div>
    );
}

export default Game;