import React from "react";
import logo from "./isar_logo_white.png";
import ship from "./ship2.png";
import bg from "./bg.png";
import "./App.css";
import { useWebSocket } from "./useWebSocket";
import useFetchData from "./useFetchData";
import AlertBox from "./components/Alertbox";
import Button from "./components/Button";
import StatusAndCharts from "./components/StatusAndCharts";
import { Action } from "./types";

const ACT_ON_SPECTRUM_URL =
  "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum";

const ControlCenter = () => {
  const { data, setData, fetchData } = useFetchData();
  const [actionRequired, setActionRequired] = React.useState<boolean>(false);
  const [action, setAction] = React.useState<Action>({
    acted: false,
    status: null,
  });

  useWebSocket(setActionRequired, setData);

  React.useEffect(() => {
    if (action.acted) {
      setTimeout(() => {
        setAction({ acted: false, status: null });
      }, 800);
    }
  });

  const handleUserAction = async () => {
    const response = await fetch(ACT_ON_SPECTRUM_URL);
    if (!response.ok) {
      setAction({ acted: true, status: "fail" });
      console.error(`HTTP error! status: ${response.status}`);
    }

    setActionRequired(false);
    setAction({ acted: true, status: "success" });
  };

  return (
    <main
      className='App flex flex-col h-screen relative m-auto'
      style={{ backgroundImage: `url(${bg})` }}>
      <img src={logo} className='App-logo' alt='logo' />
      <Button text='Refetch data' onClick={fetchData} />
      <section className='w-full lg:mt-32'>
        <img
          src={ship}
          alt='ship'
          className={`ship mt-8 lg:mt-0 w-10 lg:w-20 m-auto ${
            data?.isAscending ? "" : "transform rotate-180"
          }`}
        />
        <p className='text-xl font-bold p-4 text-white backdrop-blur'>
          {data?.isAscending ? "Ascending" : "Descending"}
        </p>
      </section>
      <section className='details w-full p-4 bg-blue-200'>
        <StatusAndCharts data={data} />
      </section>

      {actionRequired && (
        <AlertBox
          title='Action Required!'
          handleUserAction={handleUserAction}
        />
      )}
      {action.acted && (
        <AlertBox
          title={action.status === "success" ? "Dank you!" : "action failed :("}
        />
      )}
    </main>
  );
};

export default ControlCenter;
