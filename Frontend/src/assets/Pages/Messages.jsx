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
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Messages</h1>
            
            {messages.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No messages yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`p-4 rounded-lg shadow border ${
                                message.type === 'donation_approved' 
                                    ? 'bg-green-50 border-green-200' 
                                    : 'bg-white border-gray-200'
                            }`}
                        >
                            <p className="text-gray-800">{message.message}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                {new Date(message.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Messages;
