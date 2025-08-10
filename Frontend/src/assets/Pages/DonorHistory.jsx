import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-hot-toast';

const DonorHistory = () => {
    const [donations, setDonations] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
    const { token } = useAuth();

    const fetchDonorHistory = useCallback(async () => {
        try {
            const [donationsRes, notificationsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/donations/donor-history', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('http://localhost:5000/api/notifications/user', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            setDonations(donationsRes.data);
            setNotifications(notificationsRes.data);
        } catch (error) {
            console.error('Error fetching donor history:', error);
            toast.error('Failed to load donor history');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchDonorHistory();
    }, [fetchDonorHistory]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'text-green-600';
            case 'pending':
                return 'text-yellow-600';
            case 'rejected':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    const filteredDonations = donations.filter(donation => {
        if (filter === 'all') return true;
        return donation.status === filter;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Your Donation History</h1>
                    <div className="flex gap-2">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                            <option value="all">All Donations</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                
                <div className="space-y-6">
                    {filteredDonations.map((donation) => (
                        <div 
                            key={donation.id}
                            className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {donation.campaign_title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {new Date(donation.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(donation.status)}`}>
                                    {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Amount</p>
                                    <p className="font-semibold">৳{donation.amount}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Payment Method</p>
                                    <p className="font-semibold">{donation.payment_method}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Transaction ID</p>
                                    <p className="font-semibold">{donation.transaction_id}</p>
                                </div>
                            </div>
                            
                            {donation.rejection_reason && (
                                <div className="mt-4 p-3 bg-red-50 rounded-md">
                                    <p className="text-sm text-red-700">
                                        <span className="font-medium">Rejection Reason:</span> {donation.rejection_reason}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Notifications List */}
                    {notifications.map((notification) => (
                        <div 
                            key={notification.id}
                            className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">{notification.message}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(notification.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredDonations.length === 0 && notifications.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No donation history found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonorHistory;
