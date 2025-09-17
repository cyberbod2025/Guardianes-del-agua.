import React, { useState } from 'react';

/**
 * ApiKeyGate ensures that a Gemini API key is available before rendering the
 * application. It first looks in localStorage (under the key "apiKey"), then
 * falls back to environment variables GEMINI_API_KEY or API_KEY. If no key is
 * present, it renders a simple form prompting the user to paste in their
 * key. The key is stored in localStorage for subsequent sessions.
 */
export interface ApiKeyGateProps {
  /**
   * Children elements to render once the API key has been provided.
   */
  children: React.ReactNode;
}

// Helper to retrieve a stored key from localStorage. Wrapped in a try/catch
// because localStorage is not defined during server‑side rendering.
const getStoredApiKey = (): string | null => {
  try {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('apiKey') : null;
  } catch {
    return null;
  }
};

export const ApiKeyGate: React.FC<ApiKeyGateProps> = ({ children }) => {
  // Determine the initial API key from localStorage or environment variables.
  const [apiKey, setApiKey] = useState<string | null>(() => {
    return (
      getStoredApiKey() ||
      (typeof process !== 'undefined' ? (process.env.GEMINI_API_KEY as string | undefined) : undefined) ||
      (typeof process !== 'undefined' ? (process.env.API_KEY as string | undefined) : undefined) ||
      null
    );
  });
  // Controlled state for the input field.
  const [inputKey, setInputKey] = useState('');

  const handleSaveKey = () => {
    const trimmed = inputKey.trim();
    if (!trimmed) return;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('apiKey', trimmed);
      }
    } catch {
      /* ignore localStorage errors */
    }
    setApiKey(trimmed);
    setInputKey('');
  };

  // If we already have an API key, simply render the children.
  if (apiKey) {
    return <>{children}</>;
  }

  // Otherwise, render a form prompting the user for their API key.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-300 p-4">
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Introduce tu clave de la API de Gemini</h2>
        <input
          type="password"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
          placeholder="Pega tu clave aquí"
        />
        <button
          onClick={handleSaveKey}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Guardar clave
        </button>
      </div>
    </div>
  );
};