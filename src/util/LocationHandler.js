import axios from 'axios';

let cityName=null;
let userip=null;

let fetchLocationData = () => {
    if (cityName==null) {
        console.log("querying cityName");
        cityName = fetchUserip().then(response =>{
            return axios.get("http://192.168.0.4:8081/api/v1/util/geocoding/"+response.data.ip);
        }).catch(e=>{
            cityName=null
        });
        /* .then(response => {
            setFunction(response.data);
        })
        .catch(error => {
            console.error(error);
        }); */
    }else{
        console.log("cached user city successfully");
    }
    return cityName;
};

let fetchUserip = ()=>{
/*     const [userip, setUserip] = useState(null);
    const useripRef = useRef(); */
    
    if(userip==null){
        userip = axios.get("https://api.ipify.org/?format=json");
        /* .then(response =>{
            setUserip(response.data.ip);
            useripRef.current = userip;
                
            })
            .catch(e=>{
                console.error(e)
            }); */
    }else{
        console.log("useFetchUserip cached");
    }
    
    return userip;
}

export {fetchLocationData,fetchUserip};