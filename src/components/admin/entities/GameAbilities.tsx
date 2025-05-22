// components/admin/entities/GameAbilities.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { db } from '@/db/db.model';
import { useLiveQuery } from 'dexie-react-hooks';
import { DataTable } from '../DataTable';
import { EntityForm } from '../EntityForm';
import { GameAbility, Game, Ability } from '@/types';
import Image from 'next/image';

const gameImageLoader = (props: any) => {
  return `/game-art/${props.src}?w=${props.width}?q=${props.quality || 75}`;
};

const abilityImageLoader = (props: any) => {
  return `/ability-art/${props.src}?w=${props.width}?q=${props.quality || 75}`;
};

interface GameAbilitiesManagementProps {
  isAdmin: boolean;
}

export const GameAbilitiesManagement: React.FC<GameAbilitiesManagementProps> = ({ isAdmin }) => {
  const [relationship, setRelationship] = React.useState<Partial<GameAbility>>({
    gameNo: 0,
    abilityNo: 0,
  });
  const [games, setGames] = useState<Game[]>([]);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  
  const relationships = useLiveQuery(() => db.gameAbilities.toArray());
  const allGames = useLiveQuery(() => db.games.toArray());
  const allAbilities = useLiveQuery(() => db.abilities.toArray());

  useEffect(() => {
    if (allGames) setGames(allGames);
    if (allAbilities) setAbilities(allAbilities);
  }, [allGames, allAbilities]);

  // Complete addRelationship implementation
  const addRelationship = async () => {
    try {
      if (!relationship.gameNo || !relationship.abilityNo) {
        alert('Both Game and Ability must be selected');
        return;
      }

      await db.gameAbilities.add({
        gameNo: relationship.gameNo,
        abilityNo: relationship.abilityNo,
        bothNames: `${relationship.gameNo}_${relationship.abilityNo}`,
      });

      setRelationship({ gameNo: 0, abilityNo: 0 });
    } catch (error) {
      console.error('Failed to add relationship:', error);
      alert('Failed to add relationship');
    }
  };

  // Complete updateRelationship implementation
  const updateRelationship = async () => {
    try {
      if (!relationship.id || !relationship.gameNo || !relationship.abilityNo) {
        alert('ID, Game and Ability must be selected for update');
        return;
      }

      await db.gameAbilities.update(relationship.id, {
        gameNo: relationship.gameNo,
        abilityNo: relationship.abilityNo,
        bothNames: `${relationship.gameNo}_${relationship.abilityNo}`,
      });

      setRelationship({ gameNo: 0, abilityNo: 0 });
    } catch (error) {
      console.error('Failed to update relationship:', error);
      alert('Failed to update relationship');
    }
  };

  // Complete deleteRelationship implementation
  const deleteRelationship = async (id: number) => {
    try {
      if (confirm('Are you sure you want to delete this relationship?')) {
        await db.gameAbilities.delete(id);
      }
    } catch (error) {
      console.error('Failed to delete relationship:', error);
      alert('Failed to delete relationship');
    }
  };

  const handleEdit = (item: GameAbility) => {
    setRelationship(item);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRelationship({
      ...relationship,
      [name]: parseInt(value),
    });
  };

  const getGameName = (gameNo: number) => {
    return games.find(g => g.id === gameNo)?.name || 'Unknown';
  };

  const getAbilityName = (abilityNo: number) => {
    return abilities.find(a => a.id === abilityNo)?.name || 'Unknown';
  };

  const getGameImage = (gameNo: number) => {
    return games.find(g => g.id === gameNo)?.imgPath || 'null';
  };

  const getAbilityImage = (abilityNo: number) => {
    return abilities.find(a => a.id === abilityNo)?.imgPath || 'null';
  };

  const relationshipFields = [
    {
      name: 'gameNo',
      label: 'Game',
      type: 'select',
      required: true,
      options: games.map(game => ({ value: game.id!, label: game.name }))
    },
    {
      name: 'abilityNo',
      label: 'Ability',
      type: 'select',
      required: true,
      options: abilities.map(ability => ({ value: ability.id!, label: ability.name }))
    }
  ];

  const columns = [
    {
      key: 'gameNo',
      header: 'Game',
      render: (item: GameAbility) => getGameName(item.gameNo)
    },
    {
      key: 'gameImage',
      header: 'Game Image',
      render: (item: GameAbility) => (
        <Image
          loader={gameImageLoader}
          src={getGameImage(item.gameNo)}
          width={100}
          height={100}
          alt={getGameName(item.gameNo)}
          className="object-cover h-12 w-12"
        />
      )
    },
    {
      key: 'abilityNo',
      header: 'Ability',
      render: (item: GameAbility) => getAbilityName(item.abilityNo)
    },
    {
      key: 'abilityImage',
      header: 'Ability Image',
      render: (item: GameAbility) => (
        <Image
          loader={abilityImageLoader}
          src={getAbilityImage(item.abilityNo)}
          width={100}
          height={100}
          alt={getAbilityName(item.abilityNo)}
          className="object-cover h-12 w-12"
        />
      )
    }
  ];

  return (
    <div>
      {isAdmin && (
        <EntityForm<GameAbility>
          entity={relationship}
          fields={relationshipFields}
          onChange={handleChange}
          onSubmit={relationship.id ? updateRelationship : addRelationship}
          isEditing={!!relationship.id}
          onCancel={() => setRelationship({ gameNo: 0, abilityNo: 0 })}
        />
      )}

      {relationships && (
        <DataTable<GameAbility>
          columns={columns}
          data={relationships}
          onEdit={isAdmin ? handleEdit : undefined}
          onDelete={isAdmin ? deleteRelationship : undefined}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};