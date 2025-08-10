import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-hot-toast';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contact/admin/messages', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
                toast.error('Failed to load messages');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [token]);

    const handleReply = async (messageId, reply) => {
        try {
            await axios.post(`http://localhost:5000/api/contact/admin/messages/${messageId}/reply`, 
                { reply },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Reply sent successfully');
            // Refresh messages
            const response = await axios.get('http://localhost:5000/api/contact/admin/messages', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error sending reply:', error);
            toast.error('Failed to send reply');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8 animate-gradient-x">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
                        Admin Messages
                    </h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="space-y-6">
                    {messages.map((message) => (
                        <div 
                            key={message.id}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-purple-100"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        From: {message.sender_name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(message.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                                    message.replied 
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                                } shadow-sm transform hover:scale-105 transition-transform duration-300`}>
                                    {message.replied ? 'Replied' : 'Pending'}
                                </span>
                            </div>

                            <div className="mb-4 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                            </div>

                            {message.reply && (
                                <div className="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 transform hover:scale-[1.02] transition-transform duration-300">
                                    <p className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Your Reply:</p>
                                    <p className="text-gray-700">{message.reply}</p>
                                </div>
                            )}

                            {!message.replied && (
                                <div className="mt-4 space-y-3">
                                    <textarea
                                        className="w-full p-4 bg-white/50 backdrop-blur-sm border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-all duration-300"
                                        rows="3"
                                        placeholder="Type your reply..."
                                        id={`reply-${message.id}`}
                                    ></textarea>
                                    <button
                                        onClick={() => {
                                            const replyText = document.getElementById(`reply-${message.id}`).value;
                                            if (replyText.trim()) {
                                                handleReply(message.id, replyText);
                                            } else {
                                                toast.error('Please enter a reply');
                                            }
                                        }}
                                        className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    >
                                        Send Reply
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {messages.length === 0 && (
                        <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100">
                            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-xl font-medium">
                                No messages to display
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminMessages;
