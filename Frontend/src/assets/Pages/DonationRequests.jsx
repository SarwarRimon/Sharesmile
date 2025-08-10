import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from "../Context/AuthContext";

const DonationRequests = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const { token } = useAuth();

    const fetchDonations = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/pending-donations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDonations(response.data);
        } catch (error) {
            console.error('Error fetching donations:', error);
            toast.error('Failed to fetch donation requests');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchDonations();
    }, [fetchDonations]);

    const handleApprove = async (donationId) => {
        try {
            await axios.post(
                `http://localhost:5000/api/admin/approve-donation/${donationId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Donation approved successfully');
            fetchDonations(); // Refresh the list
        } catch (error) {
            console.error('Error approving donation:', error);
            toast.error('Failed to approve donation');
        }
    };

    const handleReject = async (donationId) => {
        if (!rejectionReason) {
            toast.error('Please provide a reason for rejection');
            return;
        }

        try {
            await axios.post(
                `http://localhost:5000/api/admin/reject-donation/${donationId}`,
                { reason: rejectionReason },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Donation rejected successfully');
            setSelectedDonation(null);
            setRejectionReason('');
            fetchDonations(); // Refresh the list
        } catch (error) {
            console.error('Error rejecting donation:', error);
            toast.error('Failed to reject donation');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Donation Requests</h1>
            
            {donations.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">No pending donation requests</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {donations.map((donation) => (
                        <div
                            key={donation.id}
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-600">Campaign</p>
                                    <p className="font-semibold">{donation.campaign_title}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Donor</p>
                                    <p className="font-semibold">{donation.donor_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Amount</p>
                                    <p className="font-semibold">৳{donation.amount}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Payment Method</p>
                                    <p className="font-semibold">{donation.payment_method}</p>
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">Transaction ID</p>
                                <p className="font-mono">{donation.transaction_id}</p>
                            </div>

                            <div className="mt-6 flex gap-4">
                                {selectedDonation === donation.id ? (
                                    <div className="flex-1 space-y-4">
                                        <textarea
                                            className="w-full p-2 border rounded-md"
                                            placeholder="Enter reason for rejection..."
                                            value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                            rows="2"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleReject(donation.id)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                            >
                                                Confirm Rejection
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedDonation(null);
                                                    setRejectionReason('');
                                                }}
                                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleApprove(donation.id)}
                                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => setSelectedDonation(donation.id)}
                                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonationRequests;
