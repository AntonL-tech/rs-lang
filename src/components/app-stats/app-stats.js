import React from 'react';
import s from './app-stats.module.css';
import Header from '../app-header/app-header';
import Sidebar from '../app-sidebar/app-sidebar';
import BarChart from './BarChart';

function Stats() {
  const barData = {
    label: 'Mini game name',
    color: '#70CAD1',
    data: [
      {
        name: 'A',
        value: 46,
      },
      {
        name: 'B',
        value: 87,
      },
      {
        name: 'C',
        value: 97,
      },
      {
        name: 'D',
        value: 7,
      },
      {
        name: 'E',
        value: 10,
      },
    ],
  };

  return (
    <div>
      <Header />
      <div className={'flex'}>
        <Sidebar />
        <p>Statistic</p>
        <BarChart
          data={barData.data}
          label={barData.label}
          color={barData.color}
        />
      </div>
    </div>
  );
}
export default Stats;
