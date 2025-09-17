import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-gradient-to-br from-cyan-100 to-blue-300 min-h-screen flex flex-col items-center justify-center p-4 text-center font-sans text-gray-800">
      <style>{`
        @keyframes drop {
          0% { transform: translateY(-50px) scale(0.9); opacity: 0; }
          70% { transform: translateY(10px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0px) scale(1); opacity: 1; }
        }
        .animate-drop {
          animation: drop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-2xl w-full animate-drop">
        <header className="mb-4">
          <p className="text-lg font-semibold text-blue-700">SECUNDARIA 310 "PRESIDENTES DE MÉXICO"</p>
          <p className="text-md text-gray-600">CICLO ESCOLAR 2025-2026</p>
          <p className="text-md text-gray-600">MATERIA: MATEMÁTICAS</p>
          <p className="text-md text-gray-600">PROF. HUGO SÁNCHEZ RESÉNDIZ</p>
        </header>

        <div className="my-6">
            <div className="inline-block bg-blue-500 rounded-full p-3 mb-4 shadow-lg">
                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 10.38 4.55 8.9 5.46 7.71L16.29 18.54C15.1 19.45 13.62 20 12 20ZM18.54 16.29L7.71 5.46C8.9 4.55 10.38 4 12 4C16.41 4 20 7.59 20 12C20 13.62 19.45 15.1 18.54 16.29Z" fill="currentColor"/>
                </svg>
            </div>
          <h1 className="text-4xl font-bold text-blue-800">Proyecto: Guardianes del Agua</h1>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h2 className="text-xl font-bold mb-2 text-blue-900">Tu Misión:</h2>
          <p className="text-lg leading-relaxed">
            El objetivo principal es realizar una <strong>maqueta</strong> que represente un problema de inundaciones en tu comunidad o que proponga una solución creativa, usando situaciones de tu día a día.
          </p>
        </div>

        <button 
          onClick={onStart} 
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl transition-transform transform hover:scale-105 duration-300 shadow-lg"
        >
          ¡Iniciar Misión!
        </button>
      </div>
    </div>
  );
};
