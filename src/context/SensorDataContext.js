import { createContext, useState,useEffect } from "react";

import axios from "axios";

export const SensorDataContext = createContext(null); // null is the default value

export const SensorData = (props) => {
  const [defaultSensorData, setDefaultSensorData] = useState(null);
  const [flip,setFlip] = useState(false);
  const refreshCurrentSensorData = ()=>{
    setFlip(!flip);
  }

  useEffect(() => {
    axios
      .get("http://192.168.43.35:8081/api/v1/sensor", {
        headers: {
          
        },
      })
      .then((response) => {
        setDefaultSensorData(response.data); // update your state
        console.log("sensordata updated to:");
        console.log(defaultSensorData);
      })
      .catch((error) => {
        // handle errors
      });
  }, [flip]);

  return (
    <SensorDataContext.Provider value={{defaultSensorData, setDefaultSensorData,refreshCurrentSensorData}}>
      {props.children}
    </SensorDataContext.Provider>
  );
};