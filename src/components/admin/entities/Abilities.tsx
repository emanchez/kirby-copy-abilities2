// components/admin/entities/Abilities.tsx
'use client'
import React from 'react';
import { db } from '@/db/db.model';
import { useLiveQuery } from 'dexie-react-hooks';
import { DataTable } from '../DataTable';
import { EntityForm } from '../EntityForm';
import { Ability } from '@/types';
import Image from 'next/image';

const imageLoader = (props: any) => {
  return `/ability-art/${props.src}?w=${props.width}?q=${props.quality || 75}`;
};

interface AbilitiesManagementProps {
  isAdmin: boolean;
}

export const AbilitiesManagement: React.FC<AbilitiesManagementProps> = ({ isAdmin }) => {
  const [ability, setAbility] = React.useState<Partial<Ability>>({
    name: '',
    imgPath: '',
    description: '',
  });
  const abilities = useLiveQuery(() => db.abilities.toArray());

  const addAbility = async () => {
    try {
      if (!ability.name || !ability.imgPath) {
        alert('Name and Image Path are required');
        return;
      }

      await db.abilities.add({
        name: ability.name,
        imgPath: ability.imgPath,
        description: ability.description || '',
      });

      setAbility({ name: '', imgPath: '', description: '' });
    } catch (error) {
      console.error('Failed to add ability:', error);
      alert('Failed to add ability');
    }
  };

  const updateAbility = async () => {
    try {
      if (!ability.id || !ability.name || !ability.imgPath) {
        alert('ID, Name and Image Path are required for update');
        return;
      }

      await db.abilities.update(ability.id, {
        name: ability.name,
        imgPath: ability.imgPath,
        description: ability.description || '',
      });

      setAbility({ name: '', imgPath: '', description: '' });
    } catch (error) {
      console.error('Failed to update ability:', error);
      alert('Failed to update ability');
    }
  };

  const deleteAbility = async (id: number) => {
    try {
      if (confirm('Are you sure you want to delete this ability?')) {
        await db.abilities.delete(id);
      }
    } catch (error) {
      console.error('Failed to delete ability:', error);
      alert('Failed to delete ability');
    }
  };

  const handleEdit = (item: Ability) => {
    setAbility(item);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAbility({
      ...ability,
      [name]: value,
    });
  };

  const abilityFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'imgPath', label: 'Image Path', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text', required: false },
  ];

  const columns = [
    // Add ID column for admin view
    ...(isAdmin ? [{ key: 'id', header: 'ID' }] : []),
    { key: 'name', header: 'Name' },
    {
      key: 'imgPath',
      header: 'Image',
      render: (item: Ability) => (
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
        <EntityForm<Ability>
          entity={ability}
          fields={abilityFields}
          onChange={handleChange}
          onSubmit={ability.id ? updateAbility : addAbility}
          isEditing={!!ability.id}
          onCancel={() => setAbility({ name: '', imgPath: '', description: '' })}
        />
      )}

      {abilities && (
        <DataTable<Ability>
          columns={columns}
          data={abilities}
          onEdit={isAdmin ? handleEdit : undefined}
          onDelete={isAdmin ? deleteAbility : undefined}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};