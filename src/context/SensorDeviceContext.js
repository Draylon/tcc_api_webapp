import { createContext, useState,useEffect } from "react";
import axios from "axios";

export const SensorDeviceContext = createContext(null); // null is the default value

export const SensorDevice = (props) => {
  const {mapCenter,...rest} = props;
  const [defaultSensorDevice, setDefaultSensorDevice] = useState(null);
  const [defaultSensorCoverage, setDefaultSensorCoverage] = useState(null);
  const [flip,setFlip] = useState(false);
  const refreshCurrentSensorDevice = ()=>{
    setFlip(!flip);
  }

  useEffect(() => {
    if(mapCenter==null) return;
    if(defaultSensorDevice==null){
      console.log("has no sensor data");
      axios.get("http://192.168.43.35:8081/api/v1/sensor").then(response =>{
        console.log("new sensor devices:");  
        console.log(response.data);
        /*
        {
          "location": {
            "type": "Point",
            "coordinates": [
              -26.252024, //latitude
              -48.854219  //longitude
            ]
          },
          "tokenID": "",
          "_id": "63bab0ddb280a82c58ff24ff",
          "name": "CO2 Sensor",
          "description": "CO2 esp32 LoRa",
          "data_type": [
            "CO2"
          ],
          "short_id": "ò"
        }, */
        
        let la1=100,lo1=100,la2=-100,lo2=-100;
        response.data.forEach(data1 =>{
          let la3 = data1.location.coordinates[0];
          let lo3 = data1.location.coordinates[1];
          if(la3 < la1) la1=la3;
          if(lo3 < lo1) lo1=lo3;

          if(la3 > la2) la2=la3;
          if(lo3 > lo2) lo2=lo3;
        })

        setDefaultSensorDevice(response.data);
        setDefaultSensorCoverage({from: {lat: la1-0.004,lng: lo1-0.004}, to: {lat: la2+0.004,lng: lo2+0.004}});
      })
    }else{
      //check the coverage
      console.log("has something in store, checking stored coverage");
      let asrsdc = defaultSensorCoverage;
      if( asrsdc.from.lat < mapCenter[0]-0.004 &&
          asrsdc.from.lng < mapCenter[1]-0.004 && 
          asrsdc.to.lat > mapCenter[0]+0.004 && 
          asrsdc.to.lng > mapCenter[1]+0.004){
        
        console.log("inside the query zone, might not need to update");
      }else{
        console.log("query for more possible sensors");
        console.log("additional sensors might not exist, so consider the region rendered as well");
        //query for more possible sensors
        //additional sensors might not exist, so consider the region rendered as well
        defaultSensorCoverage.from.lat = asrsdc.from.lat < mapCenter[0]-0.004 ? mapCenter[0]-0.004 : asrsdc.from.lat;
        defaultSensorCoverage.from.lng = asrsdc.from.lng < mapCenter[1]-0.004? mapCenter[1]-0.004 : asrsdc.from.lng;

        defaultSensorCoverage.to.lat = asrsdc.to.lat > mapCenter[0]+0.004  ? mapCenter[0]+0.004  : asrsdc.to.lat;
        defaultSensorCoverage.to.lng = asrsdc.to.lng > mapCenter[1]+0.004  ? mapCenter[1]+0.004 : asrsdc.to.lng;

        let la1=100,lo1=100,la2=-100,lo2=-100;

        axios.get("http://192.168.43.35:8081/api/v1/sensor").then(response =>{
          console.log("more sensor devices:");
          console.log(response.data);
          response.data.forEach(data1 =>{
            let f1 = defaultSensorDevice.filter((x)=>x._id==data1._id?false:true);
            if(f1.length >0)return;
            defaultSensorDevice.push(data1);
            
            let la3 = data1.location.coordinates[0];
            let lo3 = data1.location.coordinates[1];
            if(la3 < la1) la1=la3;
            if(lo3 < lo1) lo1=lo3;

            if(la3 > la2) la2=la3;
            if(lo3 > lo2) lo2=lo3;
          })
        });

        defaultSensorCoverage.from.lat = asrsdc.from.lat < la1? la1 : asrsdc.from.lat;
        defaultSensorCoverage.from.lng = asrsdc.from.lng < lo1? lo1 : asrsdc.from.lng;
        defaultSensorCoverage.to.lat = asrsdc.to.lat > la2  ? la2  : asrsdc.to.lat;
        defaultSensorCoverage.to.lng = asrsdc.to.lng > lo2  ? lo2 : asrsdc.to.lng;

        setDefaultSensorDevice(defaultSensorDevice);
        setDefaultSensorCoverage(defaultSensorCoverage);
      }

      
    }
    
  }, [flip,mapCenter]);


  /* useEffect(() => {
    axios
      .get("http://192.168.43.35:8081/api/v1/sensor", {
        headers: {
          
        },
      })
      .then((response) => {
        setDefaultSensorDevice(response.data); // update your state
        console.log("sensordevice updated to:");
        console.log(defaultSensorDevice);
      })
      .catch((error) => {
        // handle errors
      });
  }, [flip]); */

  return (
    <SensorDeviceContext.Provider value={{defaultSensorDevice,setDefaultSensorDevice,refreshCurrentSensorDevice,defaultSensorCoverage,setDefaultSensorCoverage}}>
      {props.children}
    </SensorDeviceContext.Provider>
  );
};