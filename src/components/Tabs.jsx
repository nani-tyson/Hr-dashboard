// src/components/Tabs.jsx
import React, { useState } from 'react';

const Tabs = ({ employee }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabStyle = (tab) =>
    `px-4 py-2 rounded-t-lg ${
      activeTab === tab
        ? 'bg-blue-600 text-white'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    } cursor-pointer transition`;

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <button className={tabStyle('overview')} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={tabStyle('projects')} onClick={() => setActiveTab('projects')}>Projects</button>
        <button className={tabStyle('feedback')} onClick={() => setActiveTab('feedback')}>Feedback</button>
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        {activeTab === 'overview' && (
          <div>
            <p><strong>Experience:</strong> 3+ years in {employee.department}</p>
            <p><strong>Goals:</strong> Improve team collaboration, enhance KPIs</p>
          </div>
        )}

        {activeTab === 'projects' && (
          <ul className="list-disc pl-5">
            <li>🚀 Onboarding Optimization (Q1)</li>
            <li>📊 Internal Performance Tracking Tool</li>
            <li>📦 Automation of HR Ops</li>
          </ul>
        )}

        {activeTab === 'feedback' && (
          <form className="space-y-4">
            <textarea
              rows={4}
              className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
              placeholder="Write feedback..."
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Tabs;
