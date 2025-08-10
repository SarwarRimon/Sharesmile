import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'react-hot-toast';

const AdminCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    const fetchCampaigns = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/active-campaigns', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCampaigns(response.data);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
            toast.error('Failed to load campaigns');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, [token]);

    const handleRemoveCampaign = async (campaignId) => {
        if (!window.confirm('Are you sure you want to remove this campaign?')) {
            return;
        }

        try {
            await axios.post(
                `http://localhost:5000/api/admin/remove-campaign/${campaignId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success('Campaign removed successfully');
            fetchCampaigns(); // Refresh the list
        } catch (error) {
            console.error('Error removing campaign:', error);
            toast.error('Failed to remove campaign');
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
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Campaigns</h1>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {campaigns.map((campaign) => (
                        <div 
                            key={campaign.id}
                            className="bg-white rounded-lg shadow overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {campaign.title}
                                    </h3>
                                    <div className="relative group">
                                        <button 
                                            onClick={() => handleRemoveCampaign(campaign.id)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {campaign.description}
                                </p>
                                
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-600">Required Amount</p>
                                        <p className="font-semibold">৳{campaign.required_amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Current Amount</p>
                                        <p className="font-semibold">৳{campaign.current_amount}</p>
                                    </div>
                                    
                                    {/* Progress bar */}
                                    <div className="relative pt-1">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                                            <div
                                                style={{ width: `${Math.min((campaign.current_amount / campaign.required_amount) * 100, 100)}%` }}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {Math.round((campaign.current_amount / campaign.required_amount) * 100)}% Funded
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {campaigns.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No active campaigns found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCampaigns;
