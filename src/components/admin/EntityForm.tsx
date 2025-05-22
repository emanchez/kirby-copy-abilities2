// components/admin/EntityForm.tsx
'use client'
import React from 'react';

interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
}

interface EntityFormProps<T> {
  entity: Partial<T>;
  fields: FormField[];
  onSubmit: () => void;
  onCancel?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isEditing?: boolean;
}

export function EntityForm<T>({
    entity,
    fields,
    onSubmit,
    onCancel,
    onChange,
    isEditing = false,
  }: EntityFormProps<T>) {
    return (
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6 border border-gray-700">
        <h2 className="text-lg font-medium mb-4 text-gray-100">
          {isEditing ? 'Edit' : 'Add'} Entity
        </h2>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-300">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={(entity as any)[field.name] ?? ''}
                    onChange={onChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                    required={field.required}
                  >
                    <option value="" className="bg-gray-800">Select...</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value} className="bg-gray-800">
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={(entity as any)[field.name] ?? ''}
                    onChange={onChange}
                    placeholder={field.placeholder}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-700 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    );
  }