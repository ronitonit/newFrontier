import React from "react";
import Chart from "react-google-charts";
import { DataFromApi } from "../types";

interface StatusAndChartsProps {
  data: DataFromApi | null;
}

type AltitudeHistoricalData = {
  time: string;
  altitude: number;
};

const StatusAndCharts: React.FC<StatusAndChartsProps> = ({ data }) => {
  const altitudeHistoricalData = React.useRef<AltitudeHistoricalData[]>([]);

  React.useEffect(() => {
    if (data?.altitude && altitudeHistoricalData.current) {
      altitudeHistoricalData.current.push({
        altitude: data.altitude,
        time: new Date().toLocaleTimeString(),
      });
    }
  }, [data]);

  return (
    <>
      <h2
        className='text-3xl lg:text-5xl font-aeonikBold p-8 text-white text-center'
        data-testid='statusMessage'>
        {data?.statusMessage}
      </h2>
      <div className='charts flex flex-col lg:flex-row '>
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
              backgroundColor: "#BFDBFE",
            }}
          />
        </div>
        <div className='flex-column p-4 lg:w-1/3'>
          <Chart
            chartType='LineChart'
            width='100%'
            height='400px'
            data-testid='altitudeChart'
            data={[
              ["time", "altitude"],
              ...altitudeHistoricalData.current.map((altitude) => [
                altitude.time,
                Number(altitude.altitude * -1),
              ]),
            ]}
            options={{
              curveType: "function",
              legend: { position: "bottom" },
              backgroundColor: "#BFDBFE",
              vAxis: {
                maxValue: 42000,
                minValue: 40000,
              },
            }}
          />
          {data?.altitude && (
            <h3 className='text-xl font-bold'>
              {Number(data.altitude * -1).toFixed(2)}
            </h3>
          )}
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
              backgroundColor: "#c08b8b",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default StatusAndCharts;
