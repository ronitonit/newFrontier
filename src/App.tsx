import React from "react";
import Chart from "react-google-charts";

import logo from "./isar_logo_black.png";
import ship from "./ship.jpg";
import "./App.css";

type Data = {
  altitude: number;
  isActionRequired: boolean;
  isAscending: boolean;
  statusMessage: string;
  temperature: number;
  velocity: number;
};

const SPECTRUM_STATUS_URL =
  "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus";
const ControlCenter = () => {
  const [data, setData] = React.useState<Data | null>(null);

  const fetchData = React.useCallback(async () => {
    try {
      const response = await fetch(SPECTRUM_STATUS_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className='App h-screen relative m-auto'>
      <img src={logo} className='App-logo' alt='logo' />
      <button
        className='px-4 py-2  bg-blue-600 text-white block self-center m-auto rounded-full'
        onClick={fetchData}>
        Refetch data
      </button>
      <section className='w-full p-4 lg:mt-32'>
        <img
          src={ship}
          alt='ship'
          className={`ship w-5 m-auto ${
            data?.isAscending ? "" : "transform rotate-180"
          }`}
        />
        <p className='text-xl p-4'>
          {data?.isAscending ? "Ascending" : "Descending"}
        </p>
      </section>
      <section className='details w-full p-4 lg:absolute lg:bottom-0'>
        <h2
          className='text-3xl lg:text-5xl font-aeonikBold'
          data-testid='statusMessage'>
          {data?.statusMessage}
        </h2>
        <div className='charts flex flex-col lg:flex-row'>
          <div className='flex-column p-4 lg:w-1/3'>
            <Chart
              chartType='LineChart'
              width='100%'
              height='400px'
              data-testid='altitudeChart'
              data={[
                ["Time", "altitude"],
                [new Date().toLocaleTimeString(), Number(data?.altitude)],
              ]}
              options={{
                curveType: "function",
                legend: { position: "bottom" },
                vAxis: {
                  maxValue: -2000,
                  minValue: -3000,
                },
              }}
            />
          </div>
          <div className='flex-column p-4 lg:w-1/3'>
            <Chart
              chartType='Gauge'
              className='gaugeChart m-auto'
              width='100%'
              height='400px'
              data-testid='temperatureChart'
              data={[
                ["Label", "Value"],
                ["Temperature", data?.temperature],
              ]}
              options={{
                redFrom: 25,
                redTo: 30,
                yellowFrom: 20,
                yellowTo: 25,
                minorTicks: 5,
                min: -30,
                max: 30,
              }}
            />
          </div>
          <div className='flex-column p-4 lg:w-1/3'>
            <Chart
              chartType='Gauge'
              className='gaugeChart m-auto'
              width='100%'
              height='400px'
              data-testid='velocityChart'
              data={[
                ["Label", "Value"],
                ["Velocity", data?.velocity],
              ]}
              options={{
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 5,
                min: -100,
                max: 100,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ControlCenter;
