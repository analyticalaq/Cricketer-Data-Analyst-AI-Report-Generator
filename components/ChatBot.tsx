
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { sendChatMessage } from '../services/geminiService';
import { SendIcon, Spinner, LinkIcon } from './Icons';

interface ChatBotProps {
    playerName: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ playerName }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 'initial', role: 'model', text: `Ask me anything about ${playerName}'s career, recent performance, or any other cricket-related questions!` }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { id: `user-${Date.now()}`, role: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const modelResponse = await sendChatMessage(userMessage.text, playerName);
            setMessages(prev => [...prev, modelResponse]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: ChatMessage = { id: `error-${Date.now()}`, role: 'model', text: "Sorry, I couldn't get a response. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-brand-surface border border-brand-border rounded-xl shadow-lg flex flex-col h-[70vh]">
            <div className="p-4 border-b border-brand-border">
                <h3 className="text-xl font-bold text-brand-text-primary">Chat with Analyst AI</h3>
                <p className="text-sm text-brand-text-secondary">Powered by Gemini with Google Search</p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                             <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">AI</div>
                        )}
                        <div className={`max-w-md lg:max-w-2xl p-3 rounded-xl ${msg.role === 'user' ? 'bg-brand-primary text-white rounded-br-none' : 'bg-brand-bg text-brand-text-primary rounded-bl-none'}`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                             {msg.sources && msg.sources.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-brand-border">
                                    <h4 className="text-xs font-semibold mb-1 text-brand-text-secondary">Sources:</h4>
                                    <ul className="space-y-1">
                                        {msg.sources.map((source, index) => (
                                            <li key={index} className="flex items-center">
                                                <LinkIcon className="w-3 h-3 mr-2 text-brand-text-secondary" />
                                                <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline truncate">
                                                    {source.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">AI</div>
                        <div className="p-3 rounded-lg bg-brand-bg">
                           <Spinner className="w-5 h-5" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-brand-border">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a follow-up question..."
                        className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-2 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="p-2 rounded-full bg-brand-primary text-white disabled:bg-brand-text-secondary disabled:cursor-not-allowed hover:bg-brand-secondary transition-colors">
                        <SendIcon className="w-6 h-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;
