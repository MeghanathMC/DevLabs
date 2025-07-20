import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { analyticsAPI } from '../services/api';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const Analytics: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analyticsData = await analyticsAPI.getDashboardStats();
        setData(analyticsData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading || !data) {
    return (
      <LoadingSpinner variant="skeleton" />
    );
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Analytics</h1>
        <p className="mt-2 text-text-secondary">Track your portfolio performance and growth metrics.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Portfolio Views', value: data.portfolioViews.toLocaleString(), change: '+23%' },
          { label: 'GitHub Stars', value: data.githubStars, change: '+12%' },
          { label: 'Total Projects', value: data.totalProjects, change: '+3' },
          { label: 'Awards Won', value: data.awardsWon, change: '+2' }
        ].map((metric, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-tertiary">{metric.label}</p>
                <p className="text-2xl font-bold text-text-primary">{metric.value}</p>
              </div>
              <span className="text-emerald-400 text-sm font-medium">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Portfolio Views Over Time */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Portfolio Views</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyViews}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#0f0f0f',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Technologies */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Top Technologies</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.topTechnologies}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                label={({ name, percentage }) => `${name} ${percentage}%`}
              >
                {data.topTechnologies.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Technology Usage */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Technology Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.topTechnologies}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#0f0f0f',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status Distribution */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Project Status</h2>
          <div className="space-y-4">
            {[
              { status: 'Completed', count: data.completedProjects, percentage: Math.round((data.completedProjects / data.totalProjects) * 100), color: 'bg-emerald-500' },
              { status: 'Ongoing', count: data.ongoingProjects, percentage: Math.round((data.ongoingProjects / data.totalProjects) * 100), color: 'bg-amber-500' },
              { status: 'Planning', count: 1, percentage: Math.round((1 / data.totalProjects) * 100), color: 'bg-indigo-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                  <span className="text-sm font-medium text-text-primary">{item.status}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-bg-tertiary rounded-full h-2">
                    <div 
                      className={`h-2 ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-text-secondary w-12 text-right">{item.count} ({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-indigo-500 to-rose-500 rounded-xl p-8 text-white">
        <h2 className="text-xl font-bold mb-4">📊 Insights & Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">🚀 Growing Popularity</h3>
            <p className="text-indigo-100">
              Your portfolio views increased by 23% this month. Keep adding quality projects to maintain this growth!
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">💡 Skill Diversification</h3>
            <p className="text-indigo-100">
              Consider adding projects with different technologies to showcase your versatility to employers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};