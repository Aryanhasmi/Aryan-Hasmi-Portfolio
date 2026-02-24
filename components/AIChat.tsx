
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { RobotIcon, ArrowUpIcon } from './Icons';
import { hapticFeedback } from '../utils';

interface AIChatProps {
    isOpen: boolean;
    onClose: () => void;
    resumeData: any;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, resumeData }) => {
    const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
        { role: 'ai', text: "Hi! I'm Aryan's AI assistant. Ask me anything about his skills, education, or projects!" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim() || isTyping) return;
        hapticFeedback('light');
        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsTyping(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `You are the AI persona of Aryan Hasmi. Use this resume data: ${JSON.stringify(resumeData)}. 
                Be professional, futuristic, and helpful. Answer the user's question based on this data. User: ${userMsg}`,
                config: { temperature: 0.7 }
            });
            setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm sorry, I couldn't process that." }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'ai', text: "Systems offline. Please try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={`ai-chat-drawer ${isOpen ? 'open' : ''}`}>
            <div className="chat-header">
                <h3><RobotIcon style={{ marginRight: '8px' }} /> A.AI</h3>
                <button onClick={() => { hapticFeedback('light'); onClose(); }}>&times;</button>
            </div>
            <div className="chat-body">
                {messages.map((m, i) => (
                    <div key={i} className={`msg ${m.role}`}>
                        <div className="msg-bubble">{m.text}</div>
                    </div>
                ))}
                {isTyping && <div className="msg ai"><div className="msg-bubble">Thinking...</div></div>}
                <div ref={chatEndRef} />
            </div>
            <div className="chat-input">
                <input 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    placeholder="Ask about Aryan's skills..."
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}><ArrowUpIcon /></button>
            </div>
        </div>
    );
};

export default AIChat;
