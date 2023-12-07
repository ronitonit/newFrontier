import { useState, useEffect } from "react";
import { DataFromApi } from "./types";

const SPECTRUM_STATUS_URL =
  "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus";

const useFetchData = () => {
  const [data, setData] = useState<DataFromApi | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(SPECTRUM_STATUS_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setData(json);
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, setData, fetchData };
};

export default useFetchData;
