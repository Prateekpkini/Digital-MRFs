import React, { useEffect, useState } from 'react';
import './App.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function App() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({ inflow: 0, materials: [] });

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setDashboardData(data);
        setLoading(false);
      });
  }, []);

  const handleDispatch = () => {
    fetch('http://localhost:5000/api/dispatch', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setDashboardData({ inflow: 0, materials: [] });
      });
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      <header>
        <h1>🌿 Digital MRF Dashboard</h1>
        <p>Track waste inflow and dispatch in real-time</p>
      </header>

      <section className="stats-section">
        <div className="stat-box">
          <h3>Total Waste Inflow</h3>
          <p>{dashboardData.inflow} kg</p>
        </div>
        <div className="stat-box">
          <h3>Materials Count</h3>
          <p>{dashboardData.materials.length}</p>
        </div>
      </section>

      <section className="graph-section">
        <h2>Waste Material Composition</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardData.materials}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <div className="button-section">
        <button onClick={handleDispatch}>🚛 Dispatch Vehicles</button>
      </div>
    </div>
  );
}

export default App;
