import Nav from "@/components/nav";
import GameData from "@/components/GameData";
import AbilityData from "@/components/AbilityData";
import { notFound } from 'next/navigation';

interface GamePageProps {
  params: { slug: string };
}

async function GamePage({ params }: GamePageProps) {
  const gameId = parseInt(params.slug);
  if (isNaN(gameId)) return notFound();

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r border-gray-800 bg-gray-900">
        <Nav />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Game Data Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Game Information</h2>
            <GameData gameId={gameId} />
          </section>

          {/* Abilities Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Abilities</h2>
            <AbilityData gameId={gameId} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default GamePage;