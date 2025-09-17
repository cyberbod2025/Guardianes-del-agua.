import React from 'react';
import { Message, Sender } from '../types';

interface ChatMessageProps {
  message: Message;
  onOptionClick: (optionText: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onOptionClick }) => {
  const isAI = message.sender === Sender.AI;

  const renderTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  
  const renderInteractiveMessage = (text: string) => {
    // Regex to find lines starting with A), B), etc., case-insensitive for the letter.
    const optionRegex = /^\s*([a-zA-Z])\)\s(.*?)$/gm;
    const matches = [...text.matchAll(optionRegex)];

    // We consider it an interactive list if there are at least two options (e.g., A and B)
    if (matches.length >= 2) {
      const firstMatchIndex = text.indexOf(matches[0][0]);
      const preamble = text.substring(0, firstMatchIndex).trim();
      
      return (
        <>
          {preamble && <p className="mb-3">{renderTextWithLineBreaks(preamble)}</p>}
          <div className="flex flex-col items-start space-y-2">
            {matches.map((match, index) => {
              const optionText = match[2].trim();
              return (
                <button
                  key={index}
                  onClick={() => onOptionClick(optionText)}
                  className="bg-blue-100 text-blue-800 border border-blue-300 rounded-lg px-4 py-2 w-full text-left hover:bg-blue-200 transition-colors duration-200"
                  aria-label={`Select option: ${optionText}`}
                >
                  <span className="font-bold mr-2">{match[1].toUpperCase()})</span>
                  {optionText}
                </button>
              );
            })}
          </div>
        </>
      );
    }

    return <p>{renderTextWithLineBreaks(text)}</p>;
  };

  if (isAI) {
    return (
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 flex-shrink-0">
          <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 8l1.414-1.414M14.586 14.586L16 16m-2.828-8.414l1.414 1.414M8 16l1.414 1.414" /></svg>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 max-w-xl shadow-md text-gray-800">
          {renderInteractiveMessage(message.text)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-end space-x-3">
      <div className="bg-blue-500 text-white rounded-lg p-4 max-w-xl shadow-md">
         <p>{renderTextWithLineBreaks(message.text)}</p>
      </div>
      <div className="w-12 h-12 flex-shrink-0">
          <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
      </div>
    </div>
  );
};
