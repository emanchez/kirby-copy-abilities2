'use client'
import React from 'react';
import { db } from '@/db/db.model';
import { useLiveQuery } from 'dexie-react-hooks';
import Image from 'next/image';

interface GameDataProps {
  gameId: number;
}

const GameData: React.FC<GameDataProps> = ({ gameId }) => {
  const game = useLiveQuery(() => db.games.get(gameId));

  if (!game) {
    return <div className="text-gray-400">Loading game data...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="bg-gray-700 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            <Image
              src={`/game-art/${game.imgPath}`}
              width={400}
              height={400}
              alt={game.name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <h3 className="text-2xl font-bold text-gray-100 mb-2">{game.name}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Release Year</p>
              <p className="text-gray-200">{game.year}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-400">Description</p>
            <p className="text-gray-300 mt-1">{game.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameData;