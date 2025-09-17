import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, Sender } from './types';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { getAiResponse } from './services/geminiService';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LicenseModal } from './components/LicenseModal';
import { ActionBar } from './components/ActionBar';

type AppState = 'welcome' | 'chat';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLicense, setShowLicense] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = useCallback(() => {
    setIsLoading(true);
    const initialMessage: Message = {
      id: crypto.randomUUID(),
      text: "¡Hola, Guardián del Agua! Soy Mentor Aqua, tu asistente IA para el proyecto de inundaciones. Estoy listo para ayudarte a diseñar tu solución. Para empezar, ¿cuál es el nombre de tu equipo?",
      sender: Sender.AI,
    };
    setMessages([initialMessage]);
    setIsLoading(false);
  }, []);

  const startChat = () => {
    setAppState('chat');
    initializeChat();
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: Sender.User,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const aiResponseText = await getAiResponse(text, messages);
      
      if (aiResponseText.includes("¡Ahora tienen su 'Licencia para Construir'!")) {
        setShowLicense(true);
      }
      
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        text: aiResponseText,
        sender: Sender.AI,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        text: '¡Oh no! Algo salió mal tratando de conectar. Por favor, revisa tu conexión e inténtalo de nuevo.',
        sender: Sender.AI,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (appState === 'welcome') {
    return <WelcomeScreen onStart={startChat} />;
  }

  return (
    <div className="bg-gradient-to-br from-cyan-100 to-blue-300 min-h-screen flex flex-col font-sans">
      <header className="bg-blue-600 text-white shadow-md p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-center">Mentor Aqua: Misión Guardianes del Agua</h1>
      </header>
      <main className="flex-1 flex flex-col p-4 overflow-hidden">
        {/* ActionBar provides quick access to template prompts */}
        <ActionBar onSelect={handleSendMessage} />
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} onOptionClick={handleSendMessage} />
          ))}
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 8l1.414-1.414M14.586 14.586L16 16m-2.828-8.414l1.414 1.414M8 16l1.414 1.414"
                    />
                  </svg>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 max-w-lg shadow-md animate-pulse">
                <p className="text-gray-600">Mentor Aqua está pensando...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-4">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </main>
      {showLicense && <LicenseModal onClose={() => setShowLicense(false)} />}
    </div>
  );
};

export default App;
