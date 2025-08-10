import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Card, GradientText } from '../Components/common';
import { themeColors, combineClasses } from '../Components/theme';
import { FaMoneyBillWave, FaClipboardList, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalDonations: 0,
    helpRequests: { pending: 0, approved: 0, rejected: 0 },
    users: { admin: 0, helpseeker: 0 },
    pendingRequests: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem('token');

  const fetchStatistics = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching statistics with token:', token); // Debug log
      
      if (!token) {
        throw new Error('No auth token available');
      }

      const res = await axios.get('http://localhost:5000/api/admin/statistics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Raw server response:', res); // Debug full response
      console.log('Fetched statistics data:', res.data); // Debug data

      if (!res.data) {
        throw new Error('No data received from server');
      }

      const formattedStats = {
        totalDonations: res.data.totalDonations || 0,
        helpRequests: {
          pending: (res.data.helpRequests || {}).pending || 0,
          approved: (res.data.helpRequests || {}).approved || 0,
          rejected: (res.data.helpRequests || {}).rejected || 0,
          ...res.data.helpRequests
        },
        users: {
          admin: (res.data.users || {}).admin || 0,
          helpseeker: (res.data.users || {}).helpseeker || 0,
          ...res.data.users
        },
        pendingRequests: res.data.pendingRequests || 0
      };

      console.log('Formatted statistics:', formattedStats); // Debug formatted data
      setStatistics(formattedStats);
      setError(null);
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to load statistics'
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  const StatCard = ({ title, value, icon: Icon }) => (
    <Card className={combineClasses(
      themeColors.animation.slideUp,
      themeColors.card.base,
      themeColors.card.hover,
      "group"
    )}>
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-600">{title}</h3>
          {Icon && (
            <div className={combineClasses(
              "p-3 rounded-lg",
              themeColors.bgGradient.medium,
              "group-hover:scale-110 transition-transform"
            )}>
              <Icon className="w-6 h-6 text-sky-600" />
            </div>
          )}
        </div>
        <GradientText className="text-3xl font-bold">{value}</GradientText>
      </div>
      <div className={combineClasses(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        themeColors.bgGradient.medium
      )}></div>
    </Card>
  );

  if (loading) {
    return (
      <div className={combineClasses(
        "min-h-screen p-8 mt-10 flex items-center justify-center",
        themeColors.bgGradient.light
      )}>
        <div className={combineClasses(
          "text-xl",
          themeColors.textGradient,
          themeColors.animation.pulse
        )}>
          Loading statistics...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={combineClasses(
        "min-h-screen p-8 mt-10 flex items-center justify-center",
        themeColors.bgGradient.light
      )}>
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className={combineClasses(
      "min-h-screen p-8 mt-10",
      themeColors.bgGradient.light,
      themeColors.animation.fadeIn
    )}>
      <GradientText as="h1" className="text-4xl font-bold mb-8">Dashboard Overview</GradientText>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Donations"
          value={`৳${statistics.totalDonations.toLocaleString()}`}
          icon={FaMoneyBillWave}
        />
        <StatCard
          title="Pending Requests"
          value={statistics.pendingRequests}
          icon={FaClipboardList}
        />
        <StatCard
          title="Total Users"
          value={Object.values(statistics.users).reduce((a, b) => a + b, 0)}
          icon={FaUsers}
        />
        <StatCard
          title="Total Help Requests"
          value={Object.values(statistics.helpRequests).reduce((a, b) => a + b, 0)}
          icon={FaHandHoldingHeart}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Help Requests by Status */}
        <Card className={combineClasses(
          themeColors.animation.slideUp,
          themeColors.card.base,
          themeColors.card.hover,
          "p-6"
        )}>
          <div className="flex items-center justify-between mb-6">
            <GradientText as="h2" className="text-xl font-semibold">Help Requests by Status</GradientText>
            <div className={combineClasses(
              "p-2 rounded-lg",
              themeColors.bgGradient.medium
            )}>
              <FaClipboardList className="w-5 h-5 text-sky-600" />
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(statistics.helpRequests).map(([status, count]) => (
              <div key={status} className={combineClasses(
                "flex justify-between items-center p-4 rounded-lg",
                themeColors.interactive.base,
                "bg-slate-50 border border-slate-200",
                "hover:bg-white hover:border-sky-200 hover:shadow-md"
              )}>
                <div className="flex items-center gap-3">
                  <div className={combineClasses(
                    "w-2 h-2 rounded-full",
                    status === 'pending' ? "bg-amber-400" :
                    status === 'approved' ? "bg-emerald-400" :
                    status === 'rejected' ? "bg-red-400" :
                    "bg-slate-400"
                  )}></div>
                  <span className="capitalize text-slate-700 font-medium">{status}</span>
                </div>
                <GradientText className="font-bold">{count}</GradientText>
              </div>
            ))}
          </div>
        </Card>

        {/* Users by Role */}
        <Card className={combineClasses(
          themeColors.animation.slideUp,
          themeColors.card.base,
          themeColors.card.hover,
          "p-6"
        )}>
          <div className="flex items-center justify-between mb-6">
            <GradientText as="h2" className="text-xl font-semibold">Users by Role</GradientText>
            <div className={combineClasses(
              "p-2 rounded-lg",
              themeColors.bgGradient.medium
            )}>
              <FaUsers className="w-5 h-5 text-sky-600" />
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(statistics.users).map(([role, count]) => (
              <div key={role} className={combineClasses(
                "flex justify-between items-center p-4 rounded-lg",
                themeColors.interactive.base,
                "bg-slate-50 border border-slate-200",
                "hover:bg-white hover:border-sky-200 hover:shadow-md"
              )}>
                <div className="flex items-center gap-3">
                  <div className={combineClasses(
                    "w-2 h-2 rounded-full",
                    role === 'admin' ? "bg-sky-400" :
                    role === 'donor' ? "bg-teal-400" :
                    "bg-slate-400"
                  )}></div>
                  <span className="capitalize text-slate-700 font-medium">{role}</span>
                </div>
                <GradientText className="font-bold">{count}</GradientText>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
