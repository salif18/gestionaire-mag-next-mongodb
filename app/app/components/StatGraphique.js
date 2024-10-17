import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatGraphique = ({ data }) => {
  const months = ["jan", "fev", "mar", "avr", "mai", "jun", "jui", "aout", "sept", "oct", "nov", "dec"];

  const chartData = data && data.length > 0 ? data.map((row) => {
    return {
      label: row.annee && row.mois ? `${months[row.mois - 1]}-${row.annee}` : 'Inconnu',
      nombreVentes: row.nombre_ventes || 0,
      totalVentes: row.total_ventes || 0,
    };
  }) : [];

  return (
    <div className='stats-graph-widget'>
      <h1>Interprétation graphique</h1>
      <div style={{ height: '300px'}}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="nombreVentes" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="totalVentes" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatGraphique;
