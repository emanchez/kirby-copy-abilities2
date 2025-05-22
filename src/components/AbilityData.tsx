'use client'
import React from 'react';
import { db } from '@/db/db.model';
import { useLiveQuery } from 'dexie-react-hooks';
import Image from 'next/image';

interface AbilityDataProps {
  gameId: number;
}

const AbilityData: React.FC<AbilityDataProps> = ({ gameId }) => {
  const relationships = useLiveQuery(() => 
    db.gameAbilities.where('gameNo').equals(gameId).toArray()
  );
  const abilities = useLiveQuery(async () => {
    if (!relationships) return [];
    const abilityIds = relationships.map(r => r.abilityNo);
    return db.abilities.where('id').anyOf(abilityIds).toArray();
  }, [relationships]);

  if (!abilities) {
    return <div className="text-gray-400">Loading abilities...</div>;
  }

  if (abilities.length === 0) {
    return <div className="text-gray-400">No abilities found for this game.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {abilities.map((ability) => (
        <div key={ability.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-750 transition">
          <div className="aspect-square bg-gray-700 rounded mb-3 overflow-hidden flex items-center justify-center">
            <Image
              src={`/ability-art/${ability.imgPath}`}
              width={200}
              height={200}
              alt={ability.name}
              className="object-cover w-full h-full"
            />
          </div>
          <h4 className="font-medium text-indigo-400">{ability.name}</h4>
          <p className="text-sm text-gray-400 mt-1">{ability.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AbilityData;