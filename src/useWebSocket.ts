import React, { useCallback, useEffect } from "react";
import { DataFromApi, DataFromWs } from "./types";

const socketUrl =
  "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS";

export const useWebSocket = (
  setIsActionRequired: React.Dispatch<React.SetStateAction<boolean>>,
  setData: React.Dispatch<React.SetStateAction<DataFromApi | null>>
) => {
  const [webSocket, setWebSocket] = React.useState<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (
      (webSocket && webSocket.readyState === WebSocket.OPEN) ||
      webSocket?.readyState === WebSocket.CONNECTING
    ) {
      return;
    }

    webSocket?.close();

    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setWebSocket(ws);
    };

    ws.onmessage = function (event) {
      const message = changeKeys(JSON.parse(event.data));
      if (message.isActionRequired) {
        setIsActionRequired(true);
      }

      setData(message);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    ws.onclose = (event) => {
      if (!event.wasClean) {
        console.log(
          "WebSocket connection closed unexpectedly. Reconnecting..."
        );
        setTimeout(connect, 3000);
      } else {
        console.log("WebSocket connection closed cleanly");
      }
    };
  }, [setData, setIsActionRequired, webSocket]);

  useEffect(() => {
    connect();

    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [connect]);
};

function changeKeys(data: DataFromWs): DataFromApi {
  const newData = {
    altitude: data.Altitude,
    isActionRequired: data.IsActionRequired,
    isAscending: data.IsAscending,
    statusMessage: data.StatusMessage,
    temperature: data.Temperature,
    velocity: data.Velocity,
  };
  return newData;
}
