import React from 'react';

const DashboardStats = ({ activeUsers, paymentFrequency, referrals }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Active Users */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Active Users</h3>
        <p className="text-4xl font-bold text-gray-800">{activeUsers}</p>
        <div className="mt-4">
          <span className="text-sm text-gray-500">Active users in the last 30 days</span>
        </div>
      </div>

      {/* Payment Frequency */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Payment Frequency</h3>
        <div className="space-y-2">
          {Object.entries(paymentFrequency).map(([frequency, count]) => (
            <div key={frequency} className="flex justify-between items-center">
              <span className="text-lg text-gray-700 capitalize">{frequency}</span>
              <span className="text-lg font-semibold text-gray-800">{count}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <span className="text-sm text-gray-500">Payment distribution by frequency</span>
        </div>
      </div>

      {/* Referral Performance */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Referral Performance</h3>
        <p className="text-4xl font-bold text-gray-800">{referrals.total} Referrals This Month</p>
        <div className="flex items-center space-x-2 mt-4">
          <span className={`text-sm ${referrals.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {referrals.growth > 0 ? `+${referrals.growth}%` : `${referrals.growth}%`}
          </span>
          <i className={`fas ${referrals.growth > 0 ? 'fa-arrow-up' : 'fa-arrow-down'} text-lg`}></i>
        </div>
        <div className="mt-4">
          <span className="text-sm text-gray-500">Referral growth compared to last month</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
