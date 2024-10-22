// import React, { useEffect, useState } from "react";


// function AreaChartCard({ weatherDetails }) {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     if (weatherDetails?.hourly?.time && weatherDetails?.hourly?.temperature_2m) {
//       const hourly = weatherDetails.hourly.time.map((time) =>
//         new Date(time).toLocaleString("en-US", { hour: "numeric", hour12: false })
//       );

//       const data = hourly.map((hour, i) => ({
//         Time: hour,
//         "Temperature (C)": weatherDetails.hourly.temperature_2m[i] !== undefined
//           ? weatherDetails.hourly.temperature_2m[i]
//           : null,
//       }));

//       setChartData(data);
//     } else {
//       console.error("Hourly time or temperature data is not available.");
//       setChartData([]);
//     }
//   }, [weatherDetails]);

//   return (
//     <Card className=" bg-gray-700 text-gray-100 mb-4">
//       <Title className="text-gray-100">Temperature over time (C)</Title>
//       <AreaChart
//         data={chartData}
//         index="Time"
//         categories={["Temperature (C)"]}
//         color="indigo"
//       />
//     </Card>
//   );
// }

// export default AreaChartCard;

import {  Card, Title } from "@tremor/react";

import { useEffect, useState } from "react";
import {
  LineChart,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Area,
  ResponsiveContainer
} from 'recharts';
export const  AreaChartCard = ({ weatherDetails }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (weatherDetails?.hourly?.time && weatherDetails?.hourly?.temperature_2m) {
      const data = weatherDetails.hourly.time.slice(0, 24).map((time, i) => ({
        time: new Date(time).toLocaleString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        }),
        temperature: weatherDetails.hourly.temperature_2m[i],
        humidity: weatherDetails.hourly.relative_humidity_2m[i]
      }));
      setChartData(data);
    }
  }, [weatherDetails]);

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 mt-6">
      <h2 className="text-xl font-bold mb-6 text-gray-100">24-Hour Forecast</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              label={{ 
                value: 'Temperature (°C) / Humidity (%)', 
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
            <Area
              type="monotone"
              dataKey="temperature"
              name="Temperature"
              stroke="#3B82F6"
              fill="url(#colorTemp)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="humidity"
              name="Humidity"
              stroke="#8B5CF6"
              fill="url(#colorHum)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};