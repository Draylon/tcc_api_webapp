import React, { useContext } from 'react';
import {LocationData, LocationDataContext,LocationDataFetcher} from '../context/LocationDataContext';
import {IPAddr,InternetProtocolContext} from '../context/IPAddrContext';

import {ContextContainer,id_} from '../util/staticVariables';

console.log(LocationDataContext);
console.log(LocationDataFetcher);
console.log(IPAddr);
console.log(InternetProtocolContext);

const CurrentStatus = ()=>{
        return (
            <LocationDataContext.Consumer>
                {({defaultLocationData, setDefaultLocationData,isManuallySet,refreshCurrentLocationData})=>{
                    return (<div>
                        <p style={{display: "contents",color: "white",}}>
                            {defaultLocationData!=null ? 
                                /* {JSON.stringify(cityName, null, 2)} */
                                defaultLocationData.city
                            : 'Loading...'}
                        </p>
                        <img src="" style={{
                            
                        }}/>
                    </div>);
                }}
            </LocationDataContext.Consumer>);
        //const { appState } = useContext(ContextContainer);
        
        /* const [cityName, setCityName] = useState(null);
        fetchLocationData().then(response=>{
            setCityName(response.data.city);
        })
        .catch(e=>console.error(e)); */
      /* return (
        <div>
            <p style={{display: "contents",color: "white",}}>
                {appState.locationData ? 
                    //{JSON.stringify(cityName, null, 2)}
                    appState.locationData.city
                : 'Loading...'}
            </p>
            <img src="" style={{
                
            }}/>
        </div>
      ); */
    
}

export default CurrentStatus;