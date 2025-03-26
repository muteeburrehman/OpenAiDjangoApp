// components/ChatMessage.jsx
import { BsRobot, BsPerson } from 'react-icons/bs';

export default function ChatMessage({ message }) {
  return (
    <div
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-3xl rounded-lg px-4 py-3 ${
          message.type === 'user' 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-white shadow rounded-bl-none'
        }`}
      >
        <div className="flex items-center mb-2">
          {message.type === 'bot' ? (
            <BsRobot className="mr-2" />
          ) : (
            <BsPerson className="mr-2" />
          )}
          <span className="font-medium">
            {message.type === 'bot' ? 'Code Explainer' : 'You'}
          </span>
        </div>
        <div className="whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
}