// import { Title, Card, Metric } from "@tremor/react";
// import { City, Country } from "country-state-city";
// import { useEffect, useState } from "react";
// import Select from "react-select";
// import AreaChartCard from "./components/AreaChartCard";
// import LineChartCard from "./components/LineChartCard";
// import { CardContent, Typography } from "@mui/material";

// function App() {
//   const [allCountries, setAllCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState({});
//   const [selectedCity, setSelectedCity] = useState({});
//   const [weatherDetails, setWeatherDetails] = useState([]);

//   useEffect(() => {
//     setAllCountries(
//       Country.getAllCountries().map((country) => ({
//         value: {
//           latitude: country.latitude,
//           longitude: country.longitude,
//           isoCode: country.isoCode,
//         },
//         label: country.name,
//       }))
//     );
//   }, []);

//   const handleSelectedCountry = (option) => {
//     setSelectedCountry(option);
//     setSelectedCity(null); // Reset city selection
//   };

//   const handleSelectedCity = (option) => {
//     setSelectedCity(option);
//   };

//   const getWeatherDetails = async (e) => {
//     e.preventDefault();
//     if (selectedCity?.value) {
//       const fetchWeather = await fetch(
//         `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity?.value?.latitude}&longitude=${selectedCity?.value?.longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,wind_speed_180m,temperature_180m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,wind_speed_10m_max&timezone=GMT`
//       );
//       const data = await fetchWeather.json();
//       setWeatherDetails(data);

//       console.log(data);
//     } else {
//       console.error("City is not selected");
//     }
//   };

//     // Helper function to format the date and time
//     const formatDateTime = (isoString) => {
//       const date = new Date(isoString);
//       return date.toLocaleString("en-US", {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });
//     };

//   const sunrise = weatherDetails?.daily?.sunrise?.[1];
//   const sunset = weatherDetails?.daily?.sunset?.[1];
//   const temperature = weatherDetails?.daily?.temperature_2m_max?.[0];
//   const uvIndex = weatherDetails?.daily?.uv_index_max?.[0];
//   const windSpeed = weatherDetails?.daily?.wind_speed_10m_max?.[0]; // Update to correct key if needed

//   return (
//     <div className="flex flex-col md:flex-row max-w-full mx-auto min-h-[150vh] px-5 bg-gray-800 text-gray-100">
//       {/* Sidebar */}
//       <div className="md:fixed top-0 left-0 w-full md:w-[25%] h-auto md:h-screen py-4 px-4 space-y-3 bg-gray-900 text-gray-100">
//         {/* Country Selector */}
//         <Select
//           options={allCountries}
//           value={selectedCountry}
//           onChange={handleSelectedCountry}
//           placeholder="Select Country"
//           className="mb-4 text-black"
//           styles={{
//             control: (base) => ({
//               ...base,
//               backgroundColor: "#2D3748", // Dark background
//             }),
//             singleValue: (base) => ({
//               ...base,
//               color: "#E2E8F0", // Light text color
//             }),
//             menu: (base) => ({
//               ...base,
//               backgroundColor: "#2D3748", // Dark background for menu
//             }),
//             option: (base, state) => ({
//               ...base,
//               backgroundColor: state.isFocused ? "#4A5568" : "#2D3748", // Darker on hover
//               color: "#E2E8F0", // Light text color
//             }),
//           }}
//         />

//         {/* City Selector */}
//         <Select
//           options={
//             selectedCountry
//               ? City.getCitiesOfCountry(selectedCountry.value?.isoCode).map((city) => ({
//                   value: {
//                     name: city.name,
//                     latitude: city.latitude,
//                     longitude: city.longitude,
//                   },
//                   label: city.name,
//                 }))
//               : []
//           }
//           value={selectedCity}
//           onChange={handleSelectedCity}
//           placeholder="Select City"
//           className="mb-4"
//           styles={{
//             control: (base) => ({
//               ...base,
//               backgroundColor: "#2D3748", // Dark background
//             }),
//             singleValue: (base) => ({
//               ...base,
//               color: "#f0f0f0", // Light text color
//             }),
//             menu: (base) => ({
//               ...base,
//               backgroundColor: "#2D3748", // Dark background for menu
//             }),
//             option: (base, state) => ({
//               ...base,
//               backgroundColor: state.isFocused ? "#4A5568" : "#2D3748", // Darker on hover
//               color: "##f0f0f0", // Light text color
//             }),
//           }}
//         />

//         {/* Get Weather Button */}
//         <button
//           onClick={getWeatherDetails}
//           className="bg-green-500 w-full py-3 text-white text-sm font-bold hover:scale-105 transition-all duration-200 ease-in-out"
//         >
//           Get Weather
//         </button>

//         {/* Selected Country and City Info */}
//         <div className="flex flex-col space-y-2 font-semibold mt-4">
//           <p className="text-gray-400">
//             {selectedCountry?.label ? selectedCountry.label : "Country not selected"} | {selectedCity?.label ? selectedCity.label : "City not selected"}
//           </p>
//           <p className="text-gray-400">
//             Coordinates: {selectedCity?.value?.latitude ?? "N/A"} | {selectedCity?.value?.longitude ?? "N/A"}
//           </p>
//         </div>

//         {/* Sunrise / Sunset */}
//         <div className="mt-4 font-semibold">
//            {/* Sunrise / Sunset */}
//         <div className="flex flex-col items-center space-y-4 mt-14">
//           <Card className="!bg-gray-800 opacity-90 backdrop-blur-md rounded-lg p-4">
//             <CardContent>
//               <Typography variant="h6" className="text-gray-200 text-3xl font-extrabold">
//                 Sunrise
//               </Typography>
//               <Metric className="text-gray-300">{formatDateTime(sunrise)}</Metric>
//             </CardContent>
//           </Card>

//           <Card className="!bg-gray-800 opacity-90 backdrop-blur-md rounded-lg p-4">
//             <CardContent>
//               <Typography variant="h6" className="text-gray-200 text-3xl font-extrabold">
//                 Sunset
//               </Typography>
//               <Metric className="text-gray-300">{formatDateTime(sunset)}</Metric>
//             </CardContent>
//           </Card>
//         </div>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="w-full md:w-[75%] md:ml-[25%] h-auto md:h-screen mt-10 md:mt-0">
//         <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 my-4">
//           <Card sx={{ textAlign: "center", backgroundColor: "#3b82f6", color: "white" }}>
//             <CardContent>
//               <Typography variant="h6" className="text-gray-100 text-lg md:text-xl lg:text-2xl">
//                 Temperature
//               </Typography>
//               <Metric className="text-gray-100 text-2xl md:text-3xl lg:text-4xl">{temperature} &#x2103;</Metric>
//             </CardContent>
//           </Card>

//           <Card sx={{ textAlign: "center", backgroundColor: "#facc15", color: "white" }}>
//             <CardContent>
//               <Typography variant="h6" className="text-gray-100 text-lg md:text-xl lg:text-2xl">
//                 Wind Speed
//               </Typography>
//               <Metric className="text-gray-800 text-2xl md:text-3xl lg:text-4xl">{windSpeed} km/h</Metric>
//             </CardContent>
//           </Card>

//           <Card sx={{ textAlign: "center", backgroundColor: "#ef4444", color: "white" }}>
//             <CardContent>
//               <Typography variant="h6" className="text-gray-100 text-lg md:text-xl lg:text-2xl">
//                 UV Index
//               </Typography>
//               <Metric className="text-gray-100 text-2xl md:text-3xl lg:text-4xl">{uvIndex}</Metric>
//             </CardContent>
//           </Card>
//         </div>

//         <div>
//           <AreaChartCard weatherDetails={weatherDetails} />
//           <LineChartCard weatherDetails={weatherDetails} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Country, City } from 'country-state-city';
import { AreaChartCard } from './components/AreaChartCard';
import { LineChartCard } from './components/LineChartCard';

const WeatherDashboard = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);

  useEffect(() => {
    setAllCountries(
      Country.getAllCountries().map((country) => ({
        value: {
          latitude: country.latitude,
          longitude: country.longitude,
          isoCode: country.isoCode,
        },
        label: country.name,
      }))
    );
  }, []);

  const handleSelectedCountry = (option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option) => {
    setSelectedCity(option);
  };

  const getWeatherDetails = async (e) => {
    e.preventDefault();
    if (selectedCity?.value) {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.value.latitude}&longitude=${selectedCity.value.longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_180m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,wind_speed_10m_max&timezone=GMT`
        );
        const data = await response.json();
        setWeatherDetails(data);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      background: '#1f2937',
      borderColor: '#374151',
      '&:hover': {
        borderColor: '#4b5563'
      }
    }),
    menu: (base) => ({
      ...base,
      background: '#1f2937',
      border: '1px solid #374151'
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? '#374151' : '#1f2937',
      color: '#f3f4f6',
      '&:hover': {
        background: '#374151'
      }
    }),
    singleValue: (base) => ({
      ...base,
      color: '#f3f4f6'
    }),
    input: (base) => ({
      ...base,
      color: '#f3f4f6'
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-100">Location Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Country</label>
                  <Select
                    options={allCountries}
                    value={selectedCountry}
                    onChange={handleSelectedCountry}
                    styles={customSelectStyles}
                    className="text-sm"
                    placeholder="Choose country..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Select City</label>
                  <Select
                    options={
                      selectedCountry
                        ? City.getCitiesOfCountry(selectedCountry.value?.isoCode).map((city) => ({
                            value: {
                              name: city.name,
                              latitude: city.latitude,
                              longitude: city.longitude,
                            },
                            label: city.name,
                          }))
                        : []
                    }
                    value={selectedCity}
                    onChange={handleSelectedCity}
                    styles={customSelectStyles}
                    className="text-sm"
                    placeholder="Choose city..."
                  />
                </div>

                <button
                  onClick={getWeatherDetails}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Get Weather
                </button>
              </div>
            </div>

            {weatherDetails && (
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                     {/* Selected Country and City Info */}
                <h2 className="text-xl font-bold mb-4">Selected Country and City Info</h2>

         <div className="flex flex-col space-y-2 font-semibold mt-4">
           <p className="text-gray-400">
             {selectedCountry?.label ? selectedCountry.label : "Country not selected"} | {selectedCity?.label ? selectedCity.label : "City not selected"}
           </p>
           <p className="text-gray-400">
             Coordinates: {selectedCity?.value?.latitude ?? "N/A"} | {selectedCity?.value?.longitude ?? "N/A"}
           </p>
        </div>
                <h2 className="text-xl font-bold mb-4">Sun Schedule</h2>
                <div className="space-y-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Sunrise</p>
                        <p className="text-lg font-semibold">
                          {formatTime(weatherDetails?.daily?.sunrise?.[0])}
                        </p>
                      </div>
                      <svg
                        className="w-8 h-8 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Sunset</p>
                        <p className="text-lg font-semibold">
                          {formatTime(weatherDetails?.daily?.sunset?.[0])}
                        </p>
                      </div>
                      <svg
                        className="w-8 h-8 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-3">
            {weatherDetails ? (
              <div className="space-y-6">
                {/* Weather Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Temperature Card */}
                  <div className="bg-gradient-to-br h-52 from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-blue-100">Temperature</p>
                        <h3 className="text-3xl font-bold mt-2">
                          {weatherDetails?.daily?.temperature_2m_max?.[0]}°C
                        </h3>
                      </div>
                      <svg
                        className="w-8 h-8 text-blue-100"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Wind Speed Card */}
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-yellow-100">Wind Speed</p>
                        <h3 className="text-3xl font-bold mt-2">
                          {weatherDetails?.daily?.wind_speed_10m_max?.[0]} km/h
                        </h3>
                      </div>
                      <svg
                        className="w-8 h-8 text-yellow-100"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1111.5 9H2"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* UV Index Card */}
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-red-100">UV Index</p>
                        <h3 className="text-3xl font-bold mt-2">
                          {weatherDetails?.daily?.uv_index_max?.[0]}
                        </h3>
                      </div>
                      <svg
                        className="w-8 h-8 text-red-100"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hourly Data */}
                <div className="bg-gray-800 min-h-[500px] rounded-xl p-6 shadow-lg border border-gray-700">
                  <h2 className="text-xl font-bold mb-4">Hourly Forecast</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {weatherDetails?.hourly?.time?.slice(0, 8).map((time, index) => (
                      <div
                        key={time}
                        className="bg-gray-700/50 rounded-lg py-14 p-4 text-center"
                      >
                        <p className="text-sm text-gray-400">
                          {new Date(time).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            hour12: true,
                          })}
                        </p>
                        <p className="text-lg font-bold mt-1">
                          {weatherDetails.hourly.temperature_2m[index]}°C
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {weatherDetails.hourly.relative_humidity_2m[index]}% Humidity
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 text-center">
                <svg
                  className="w-16 h-16 text-gray-600 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-400">
                  Select a location to view weather details
                </h3>
              </div>
            )}
          </div>
        </div>
                <div>
           <AreaChartCard weatherDetails={weatherDetails} />
           <LineChartCard weatherDetails={weatherDetails} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;