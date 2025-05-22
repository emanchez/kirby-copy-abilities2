// components/admin/entities/Games.tsx
'use client'
import React from 'react';
import { db } from '@/db/db.model';
import { useLiveQuery } from 'dexie-react-hooks';
import { DataTable } from '../DataTable';
import { EntityForm } from '../EntityForm';
import { Game } from '@/types';
import Image from 'next/image';

const imageLoader = (props: any) => {
  return `/game-art/${props.src}?w=${props.width}?q=${props.quality || 75}`;
};

interface GamesManagementProps {
  isAdmin: boolean;
}

export const GamesManagement: React.FC<GamesManagementProps> = ({ isAdmin }) => {
  const [game, setGame] = React.useState<Partial<Game>>({
    name: '',
    year: 0,
    imgPath: '',
    description: '',
  });
  const games = useLiveQuery(() => db.games.toArray());

  const addGame = async () => {
    try {
      if (!game.name || !game.imgPath) {
        alert('Name and Image Path are required');
        return;
      }

      await db.games.add({
        name: game.name,
        year: game.year || 0,
        imgPath: game.imgPath,
        description: game.description || '',
      });

      setGame({ name: '', year: 0, imgPath: '', description: '' });
    } catch (error) {
      console.error('Failed to add game:', error);
      alert('Failed to add game');
    }
  };

  const updateGame = async () => {
    try {
      if (!game.id || !game.name || !game.imgPath) {
        alert('ID, Name and Image Path are required for update');
        return;
      }

      await db.games.update(game.id, {
        name: game.name,
        year: game.year || 0,
        imgPath: game.imgPath,
        description: game.description || '',
      });

      setGame({ name: '', year: 0, imgPath: '', description: '' });
    } catch (error) {
      console.error('Failed to update game:', error);
      alert('Failed to update game');
    }
  };

  const deleteGame = async (id: number) => {
    try {
      if (confirm('Are you sure you want to delete this game?')) {
        await db.games.delete(id);
      }
    } catch (error) {
      console.error('Failed to delete game:', error);
      alert('Failed to delete game');
    }
  };

  const handleEdit = (item: Game) => {
    setGame(item);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setGame({
      ...game,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    });
  };

  const gameFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'year', label: 'Year', type: 'number', required: true },
    { name: 'imgPath', label: 'Image Path', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text', required: false },
  ];

  const columns = [
    // Add ID column for admin view
    ...(isAdmin ? [{ key: 'id', header: 'ID' }] : []),
    { key: 'name', header: 'Name' },
    { key: 'year', header: 'Year' },
    {
      key: 'imgPath',
      header: 'Image',
      render: (item: Game) => (
        <Image
          loader={imageLoader}
          src={item.imgPath}
          width={100}
          height={100}
          alt={item.name}
          className="object-cover h-12 w-12"
        />
      ),
    },
    { key: 'description', header: 'Description' },
  ];

  return (
    <div>
      {isAdmin && (
        <EntityForm<Game>
          entity={game}
          fields={gameFields}
          onChange={handleChange}
          onSubmit={game.id ? updateGame : addGame}
          isEditing={!!game.id}
          onCancel={() => setGame({ name: '', year: 0, imgPath: '', description: '' })}
        />
      )}

      {games && (
        <DataTable<Game>
          columns={columns}
          data={games}
          onEdit={isAdmin ? handleEdit : undefined}
          onDelete={isAdmin ? deleteGame : undefined}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};