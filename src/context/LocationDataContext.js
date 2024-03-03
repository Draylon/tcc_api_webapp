import { createContext, useState,useEffect } from "react";
import { InternetProtocolContext, IPAddr } from "./IPAddrContext";
import axios from 'axios';
export const LocationDataContext = createContext(null); // null is the default value

console.log(IPAddr)
console.log(InternetProtocolContext)
console.log(LocationDataContext)

export const LocationDataFetcher = (props) =>{
    const {defaultIpAddr,...rest} = props;
    console.log("querying locationdata using ");
    console.log(defaultIpAddr);

    const [defaultLocationData, setDefaultLocationData] = useState(null);
    const [manuallySet,isManuallySet] = useState(false);
    const [flip,setFlip] = useState(false);
    const refreshCurrentLocationData = ()=>{
        setFlip(!flip);
    }

    useEffect(() => {
    if(!manuallySet && defaultIpAddr !=null){
        axios.get("http://192.168.43.35:8081/api/v1/util/geocoding/"+defaultIpAddr.ip, {
            headers: {
                
            },
        }).then((response) => {
            setDefaultLocationData(response.data); // update your state
            console.log("locationdata updated to:");
            console.log(defaultLocationData);
        }).catch((error) => {
            console.error("FAILED QUERYING LOCATIONDATA");
            console.log(error);
            // handle errors
        });
    }
    }, [flip,defaultIpAddr]);
    
    return (
    <LocationDataContext.Provider value={{defaultLocationData, setDefaultLocationData,isManuallySet,refreshCurrentLocationData}}>
        {props.children}
    </LocationDataContext.Provider>
    );
}

export const LocationData = (props) => {
    return (<IPAddr>
            <InternetProtocolContext.Consumer>
                {({defaultIpAddr, setDefaultIpAddr,refreshCurrentIpAddr})=>(
                    <LocationDataFetcher
                        defaultIpAddr={defaultIpAddr}>
                            {props.children}
                        </LocationDataFetcher>
                )}
            </InternetProtocolContext.Consumer>
    </IPAddr>)
};