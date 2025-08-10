import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-hot-toast';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    const fetchMessages = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/notifications/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to fetch messages');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="relative">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-8 w-8 border-2 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
                    </div>
                </div>
                <p className="mt-4 text-gray-500 animate-pulse">Loading messages...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Messages & Notifications
                </h1>
                
                {messages.length === 0 ? (
                    <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="h-20 w-20 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center text-4xl">
                                📭
                            </div>
                            <p className="text-gray-600 text-lg">No messages yet</p>
                            <p className="text-gray-500">Notifications will appear here when you receive them</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`group relative overflow-hidden p-6 rounded-xl shadow-lg border border-purple-100 transition-all duration-300
                                    hover:shadow-xl bg-white/80 backdrop-blur-sm ${
                                    message.type === 'donation_approved' 
                                        ? 'hover:border-green-200' 
                                        : 'hover:border-purple-200'
                                }`}
                            >
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300
                                    bg-gradient-to-r ${
                                    message.type === 'donation_approved'
                                        ? 'from-green-500 to-emerald-500'
                                        : 'from-indigo-500 to-purple-500'
                                }`}></div>
                                <div className="relative">
                                    <div className="flex items-start space-x-4">
                                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-white
                                            bg-gradient-to-r ${
                                            message.type === 'donation_approved'
                                                ? 'from-green-500 to-emerald-500'
                                                : 'from-indigo-500 to-purple-500'
                                        }`}>
                                            {message.type === 'donation_approved' ? '✅' : '📫'}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-700 leading-relaxed">{message.message}</p>
                                            <div className="flex items-center mt-3 text-sm">
                                                <div className={`h-2 w-2 rounded-full mr-2 ${
                                                    message.type === 'donation_approved' 
                                                        ? 'bg-green-400'
                                                        : 'bg-purple-400'
                                                }`}></div>
                                                <p className="text-gray-500">
                                                    {new Date(message.created_at).toLocaleDateString()} at{' '}
                                                    {new Date(message.created_at).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
