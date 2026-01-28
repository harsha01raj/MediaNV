/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/purity */
'use client';

import { useEffect, useState } from 'react';
import { getSocket } from '../lib/socket';

const socket = getSocket();

type Message = {
    id?: string;
    roomId: string;
    senderId: string;
    content: string;
};

export default function ChatRoom() {
    const [roomId, setRoomId] = useState('room-1');
    const [userId, setUserId] = useState(
        'user-' + Math.floor(Math.random() * 1000),
    );
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [typingUser, setTypingUser] = useState<string | null>(null);

    useEffect(() => {
        // join room
        socket.emit('joinRoom', { roomId, userId });

        socket.on('newMessage', (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on('typing', (userId: string) => {
            setTypingUser(userId);
            setTimeout(() => setTypingUser(null), 1000);
        });

        socket.on('userJoined', (data) => {
            console.log('User joined:', data.userId);
        });

        return () => {
            socket.off('newMessage');
            socket.off('typing');
            socket.off('userJoined');
        };
    }, [roomId, userId]);

    const sendMessage = () => {
        if (!message.trim()) return;

        socket.emit('sendMessage', {
            roomId,
            senderId: userId,
            content: message,
        });

        setMessage('');
    };

    const handleTyping = () => {
        socket.emit('typing', { roomId, userId });
    };

    return (
        <div className="w-full max-w-md bg-gray-800 rounded-xl p-4 flex flex-col">
            <h2 className="text-lg font-bold mb-2">
                Room: {roomId}
            </h2>

            <div className="flex-1 overflow-y-auto space-y-2 mb-2">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded ${msg.senderId === userId
                                ? 'bg-blue-600 text-right'
                                : 'bg-gray-700'
                            }`}
                    >
                        <div className="text-xs opacity-70">
                            {msg.senderId}
                        </div>
                        <div>{msg.content}</div>
                    </div>
                ))}
            </div>

            {typingUser && (
                <div className="text-xs italic mb-1">
                    {typingUser} is typing...
                </div>
            )}

            <div className="flex gap-2">
                <input
                    className="flex-1 rounded px-2 py-1 text-black"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                    placeholder="Type message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 px-4 py-1 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
}