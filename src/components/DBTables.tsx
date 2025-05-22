// components/DBTables.tsx
'use client'
import React, { useState } from 'react';
import { GamesManagement } from './admin/entities/Games';
import { AbilitiesManagement } from './admin/entities/Abilities';
import { GameAbilitiesManagement } from './admin/entities/GameAbilities';

interface DBTablesProps {
  isAdmin: boolean;
}

export const DBTables: React.FC<DBTablesProps> = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = useState<'games' | 'abilities' | 'relationships'>('games');

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      <div className="border-b border-gray-700">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('games')}
            className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'games'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            Games
          </button>
          <button
            onClick={() => setActiveTab('abilities')}
            className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'abilities'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            Abilities
          </button>
          <button
            onClick={() => setActiveTab('relationships')}
            className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'relationships'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500'
            }`}
          >
            Relationships
          </button>
        </nav>
      </div>

      <div className="p-6 bg-gray-800">
        {activeTab === 'games' && <GamesManagement isAdmin={isAdmin} />}
        {activeTab === 'abilities' && <AbilitiesManagement isAdmin={isAdmin} />}
        {activeTab === 'relationships' && <GameAbilitiesManagement isAdmin={isAdmin} />}
      </div>
    </div>
  );
};

export default DBTables