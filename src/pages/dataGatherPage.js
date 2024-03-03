import { MapContainer, TileLayer, Marker, Popup, LayerGroup, Circle, FeatureGroup, Rectangle,useMapEvents,useMap} from 'react-leaflet';
import L from 'leaflet';
import "../styles/DataGatherPage.css";
import 'leaflet/dist/leaflet.css';
import React, { useContext, useEffect, useState,useRef,useCallback,useMemo} from 'react';
import { ContextContainer,id_ } from '../util/staticVariables';
import axios from 'axios';
import { LocationDataContext } from '../context/LocationDataContext';
import { SensorData, SensorDataContext } from '../context/SensorDataContext';
import { SensorDevice,SensorDeviceContext } from '../context/SensorDeviceContext';
import { Tab,Tabs } from 'react-bootstrap';





import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Gráfico:",
    },
  },
};

const data1 = [  "456.29",  "440.87",  "404.78",  "422.33",  "459.63",  "396.72",  "424.91",  "394.16",  "445.24",  "453.97",  "463.65",  "411.94",  "457.08",  "403.12",  "410.06",  "468",  "460.71",  "408.4",  "437.41",  "412.27",  "393.49",  "456.78",  "463.11",  "416.52",  "405.93",  "440.39",  "406.16",  "455.2",  "464.92",  "404.41",  "414.85",  "445.79",  "397.09",  "425.77",  "418.68",  "448.15",  "415.39","449.93","399.61","417.64","465.21","488.47","497.98","493.62","513.72","525.44","500.34"];
const labels = ["17:15","17:45","18:15","18:45",  "19:15",  "19:45",  "20:15",  "20:45",  "21:15",  "21:45",  "22:15",  "22:45",  "23:15",  "23:45",  "00:15",  "00:45",  "01:15",  "01:45",  "02:15",  "02:45",  "03:15",  "03:45",  "04:15",  "04:45",  "05:15",  "05:45",  "06:15",  "06:45",  "07:15",  "07:45",  "08:15",  "08:45",  "09:15",  "09:45",  "10:15",  "10:45",  "11:15",  "11:45",  "12:15",  "12:45",  "13:15",  "13:45",  "14:15",  "14:45",  "15:15",  "15:45",  "16:15"];
const data123 = {
  labels,
  datasets: [
    {
      label: "Últimas leituras",
      data: data1.map((x) => {
        return x;
      }),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};












const defaultCenter = [-24.301512, -48.848012]
const rectangle = [
  [-26.299512, -48.846012],
  [-26.303512, -48.850012],
]

const fillBlueOptions = { fillColor: 'blue' }
const fillRedOptions = { fillColor: 'red' }
const greenOptions = { color: 'green', fillColor: 'green' }
const purpleOptions = { color: 'purple' }


//const center = [51.505, -0.09]
const zoom = 13

function MapPlaceholder() {
  return (
    <h2>
      Carregando Mapa...
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </h2>
  )
}

const DraggableMarker = ()=>{
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(defaultCenter)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}



const MarkerDataTabs = (props)=>{
  const {data,...rest} = props;
  const [currTab,setCurrTab] = useState(0);
  const pickedTab = (new_)=>{
    setCurrTab(new_);
  }

  return (<Tabs
      activeKey={currTab}
      onSelect={pickedTab}
      id="controlled-tab-data"
    >
      {data.map((type,index)=>(<Tab
          eventKey={index}
          disabled={type=="null"}
          title={type}>
          {/* pegar dados de {type} */}
          <Line options={options} data={data123} />
        </Tab>))}
    </Tabs>);
}

const SensorIconMarker= L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',

  iconSize:     [30,32], // size of the icon
  //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const SensorMarker = (props)=>{
  const {identifier,name,desc,types,position,...rest} = props;
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        /* const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        } */
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    /* setDraggable((d) => !d) */
  }, [])

  return (
    <Marker
    eventHandlers={eventHandlers}
    position={position}
    icon={SensorIconMarker}
    ref={markerRef}>
        <Popup minWidth={450}>
            <h4>{name}</h4>
            <p>{desc}</p>
            <MarkerDataTabs data={types}/>
        </Popup>
    </Marker>
  )
}

const LocationMarker = ()=>{
  const [position, setPosition] = useState(null)
  const map = useMap();
  
  const map_ev = useMapEvents({
    click() {
      console.log("locating?")
      map_ev.locate()
    },
    locationfound(e) {
      console.log("ev triggered");
    },
  })
  
  useEffect(()=>{
    map.locate().on("locationfound", (e)=>{
      console.log("located")
      console.log(e)
      setPosition(e.latlng)
      map_ev.flyTo(e.latlng, map.getZoom())
    }).on("click",(e)=>{
      console.log("map clicked?")
    }).on("locationerror",(e)=>{
      console.log("locationerror")
      console.log(e)
    }).on("error",(e)=>{
      console.log("another unrelated locationerror")
      console.log(e)
    })
  },[map])
  
  

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const DisplayPosition = ({ map,center })=>{
  const [position, setPosition] = useState(() => map.getCenter())

  const onClick = useCallback(() => {
    map.setView(center, zoom)
  }, [map,center])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <div className='leaflet_floatingActionButton'>
      <p>{position.lat.toFixed(4)},{position.lng.toFixed(4)}{' '}</p>
      <button onClick={onClick}>reset</button>
    </div>
  )
}

let latestCenter = [];

const DataGatherPage = ({map,setMap,center,defaultSensorDevice})=>{
  
  const displayMap = useMemo(()=>(
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker/>
        {defaultSensorDevice!=null?defaultSensorDevice.map(x=>(
          <SensorMarker
              identifier={x._id}
              name={x.name}
              desc={x.description}
              types={x.data_type}
              position={x.location.coordinates}
          />
        )):null}
      </MapContainer>
    ),[defaultSensorDevice],)

  useEffect(() => {
    console.log("callbacking");
    if(latestCenter != []){
      if(latestCenter!=center){
        latestCenter=center;
        if(map!=null)map.setView(center, zoom)
      }
    }else{
      latestCenter=center;
    }
  }, [map,center])

  return (
    <div className='msec_leftmost'>
      {map ? <DisplayPosition map={map} center={center} /> : null}
      {displayMap}
    </div>
  )
}


const SidePanelComponent = (props)=>{
  const {map,center,defaultSensorDevice,...rest} = props;
  console.log("defaultSensorDevice");
  console.log(defaultSensorDevice);
  let sensorDataTabs = new Map(); // sensores agrupados pelo tipo de dado
  let sensorData2 = new Object(); // regiões de problema - sensores que reportaram recentemente
  if(defaultSensorDevice!=null)
    defaultSensorDevice.forEach( x => {
      x.data_type.forEach(dtype => {
        if(dtype.toLowerCase()!="no measurement units")
          if(sensorDataTabs.has(dtype))
              sensorDataTabs.get(dtype).push(x._id)
          else sensorDataTabs.set(dtype,[x._id]);
      })
    });
  
    const [currTab,setCurrTab] = useState(0);
    const pickedTab = (new_)=>{
      setCurrTab(new_);
    }
    console.log(sensorDataTabs);
    const dataTabDisplay = [];
    sensorDataTabs.forEach((value,key)=>{
      dataTabDisplay.push(<Tab
        eventKey={dataTabDisplay.length+0}
        disabled={key=="null"}
        title={key}>
        {/* pegar dados de {value} */}
        <Line options={options} data={data123} />
      </Tab>);
    })
  return (<div>
    <Tabs
      activeKey={currTab}
      onSelect={pickedTab}
      id="controlled-tab-by_types"
    >
      {dataTabDisplay}
      
    </Tabs>
  </div>);
}

const SidePanel = (props)=>{
  const {map,center, defaultSensorDevice,...rest} = props;
  return (<div className='msec_rightmost'>
            <SidePanelComponent
                map={map}
                center={center}
                defaultSensorDevice={defaultSensorDevice}
            />
  </div>);
}

const DataGatherPageFragment = (props)=>{
  const [map, setMap] = useState(null)

  const {defaultLocationData,defaultSensorDevice,...rest} = props;
  console.log("triggered an update:");
  console.log(defaultLocationData);

  let centerFromContext = defaultLocationData!=null ? [defaultLocationData.latitude,defaultLocationData.longitude] : defaultCenter;
  return (
    <div className='main_section'>
      <div className='mainsection_featured' style={{
        height: "90vh",
        display: "flex",
        flexDirection: "row",
        flex: "auto",
        paddingBottom: 0,
        paddingTop: 0
        }}>
          <DataGatherPage map={map} setMap={setMap} center={centerFromContext} defaultSensorDevice={defaultSensorDevice}/>
          <SidePanel map={map} center={centerFromContext} defaultSensorDevice={defaultSensorDevice}/>
      </div>
    </div>);
}

const DataGatherPageFrame = ()=>{
  return (
    <LocationDataContext.Consumer>
          {({defaultLocationData, setDefaultLocationData,isManuallySet,refreshCurrentLocationData})=>{
            return(
            <SensorDevice mapCenter={defaultLocationData!=null?[defaultLocationData[0],defaultLocationData[1]]:defaultCenter}>
              <SensorDeviceContext.Consumer>
                  {({defaultSensorDevice,setDefaultSensorDevice,refreshCurrentSensorDevice})=>(
                      <DataGatherPageFragment defaultLocationData={defaultLocationData} defaultSensorDevice={defaultSensorDevice}/>
                  )}
              </SensorDeviceContext.Consumer>
            </SensorDevice>);
          }}
    </LocationDataContext.Consumer>
  );
}


export default DataGatherPageFrame;