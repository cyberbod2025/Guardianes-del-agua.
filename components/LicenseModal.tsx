import React from 'react';

interface LicenseModalProps {
  onClose: () => void;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({ onClose }) => {
  const confettiPieces = Array.from({ length: 30 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 2 + 3}s`,
      animationDelay: `${Math.random() * 2}s`,
    };
    const colors = ['bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-pink-400', 'bg-purple-400'];
    const colorClass = colors[i % colors.length];
    return <div key={i} className={`confetti ${colorClass}`} style={style}></div>;
  });

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.8) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .confetti {
          position: fixed;
          top: 0;
          width: 10px;
          height: 10px;
          opacity: 0;
          animation-name: confetti-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden animate-scaleUp"
          onClick={(e) => e.stopPropagation()}
        >
          {confettiPieces}
          
          <div className="mx-auto bg-green-100 rounded-full h-20 w-20 flex items-center justify-center border-4 border-green-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mt-6">¡Felicidades, Guardianes!</h2>
          <p className="text-lg text-gray-600 mt-2">
            Han completado su Plan de Ataque y han obtenido su...
          </p>
          
          <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4 my-6">
            <h3 className="text-2xl font-bold text-blue-700 tracking-wider">Licencia para Construir</h3>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
          >
            ¡Continuar Misión!
          </button>
        </div>
      </div>
    </>
  );
};
