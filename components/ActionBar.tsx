import React from 'react';
import { TEMPLATES } from '../templates';

/**
 * ActionBar component renders a set of buttons for predefined templates. When a
 * user clicks on one of the buttons, the associated template text is passed
 * back up to the parent via the onSelect callback. This allows the parent
 * component (typically App) to handle the message as if the user had typed
 * it themselves.
 */
export interface ActionBarProps {
  /**
   * Callback invoked when a template button is clicked. The selected template
   * text will be passed as the argument.
   */
  onSelect: (template: string) => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({ onSelect }) => {
  // Define the available actions and their human‑friendly labels. The keys
  // correspond to keys in the TEMPLATES object.
  const actions = [
    { key: 'mission', label: 'Misión' },
    { key: 'bitacora', label: 'Bitácora' },
    { key: 'plan', label: 'Plan de Ataque' },
    { key: 'license', label: 'Licencia' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {actions.map((action) => (
        <button
          key={action.key}
          onClick={() => onSelect(TEMPLATES[action.key as keyof typeof TEMPLATES])}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 text-sm md:text-base"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};