// import React, { useEffect, useState } from "react";
// import { LineChart, Card, Title } from "@tremor/react";

// function LineChartCard({ weatherDetails }) {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     if (weatherDetails?.daily?.temperature_2m_max && weatherDetails?.daily?.temperature_2m_min) {
//       const days = weatherDetails.daily.time.slice(0, 7); // Display last 7 days
//       const temperatures = days.map((day, i) => ({
//         Day: new Date(day).toLocaleDateString(),
//         "Max Temp (C)": weatherDetails.daily.temperature_2m_max[i],
//         "Min Temp (C)": weatherDetails.daily.temperature_2m_min[i],
//       }));

//       setChartData(temperatures);
//     } else {
//       console.error("Daily temperature data is not available.");
//       setChartData([]);
//     }
//   }, [weatherDetails]);

//   return (
//     <Card className="bg-gray-800 text-gray-100">
//       <Title className="text-gray-100">Temperature Trends (C)</Title>
//       <LineChart
//         data={chartData}
//         index="Day"
//         categories={["Max Temp (C)", "Min Temp (C)"]}
//         colors={["indigo", "red"]}
//       />
//     </Card>
//   );
// }

// export default LineChartCard;

import React, { useEffect, useState } from 'react';
import { LineChart, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Area, ResponsiveContainer } from 'recharts';

export const LineChartCard = ({ weatherDetails }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (weatherDetails?.daily?.temperature_2m_max && weatherDetails?.daily?.temperature_2m_min) {
      const days = weatherDetails.daily.time.slice(0, 7);
      const temperatures = days.map((day, i) => ({
        day: new Date(day).toLocaleDateString('en-US', { weekday: 'short' }),
        maxTemp: weatherDetails.daily.temperature_2m_max[i],
        minTemp: weatherDetails.daily.temperature_2m_min[i],
      }));
      setChartData(temperatures);
    }
  }, [weatherDetails]);

  return (
    <div className="bg-gray-800 rounded-xl mt-6 p-6 shadow-lg border border-gray-700">
      <h2 className="text-xl font-bold mb-6 text-gray-100">Temperature Trends</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="day" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              label={{ 
                value: 'Temperature (°C)', 
                angle: -90, 
                position: 'insideLeft',
                fill: '#9CA3AF'
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#F3F4F6'
              }}
            />
            <Legend 
              iconType="circle"
              wrapperStyle={{
                paddingTop: '1rem',
                color: '#9CA3AF'
              }}
            />
            <Line
              type="monotone"
              dataKey="maxTemp"
              name="Max Temperature"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="minTemp"
              name="Min Temperature"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ fill: '#EF4444', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};