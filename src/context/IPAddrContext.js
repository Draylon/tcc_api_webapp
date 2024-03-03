import { createContext, useState,useEffect, useRef } from "react";
import axios from 'axios';
const InternetProtocolContext = createContext(null);

const IPAddr = (props) => {
  const [defaultIpAddr, setDefaultIpAddr] = useState(null);
  const [flip,setFlip] = useState(false);
  const refreshCurrentIpAddr = ()=>{
    setFlip(!flip);
  }

  useEffect(() => {
    axios.get("https://api.ipify.org/?format=json", {
        headers: {
          
        },
      })
      .then((response) => {
        
        setDefaultIpAddr(response.data); // update your state
        console.log("ipaddr updated to:");
        console.log(response.data);
        console.log(defaultIpAddr);
      })
      .catch((error) => {
        
        // handle errors
      });
  }, [flip]);

  return (
    <InternetProtocolContext.Provider value={{defaultIpAddr, setDefaultIpAddr,refreshCurrentIpAddr}}>
      {props.children}
    </InternetProtocolContext.Provider>
  );
};

export {InternetProtocolContext,IPAddr};