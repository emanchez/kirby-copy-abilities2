'use client'
import React from 'react';
import { db } from '@/db/db.model';
import { useLiveQuery } from 'dexie-react-hooks';
import Image from 'next/image';
import Link from 'next/link';

const GamesCatalog = () => {
  const games = useLiveQuery(() => db.games.toArray());

  return (
    <div className="bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Kirby Games Catalog</h1>
          <p className="text-gray-400 mt-2">Browse all games in the database</p>
        </div>

        {/* Loading State */}
        {!games && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 h-64 animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Games Grid */}
        {games && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <Link 
                key={game.id} 
                href={`/game/${game.id}`}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="aspect-video bg-gray-700 relative overflow-hidden">
                  <Image
                    src={`/game-art/${game.imgPath}`}
                    fill
                    alt={game.name}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-100 truncate">{game.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-400">{game.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {games && games.length === 0 && (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">No games found in the database</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesCatalog;