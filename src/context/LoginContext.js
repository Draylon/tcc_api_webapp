import { createContext, useState,useEffect, useRef } from "react";

import axios from "axios";

export const LoginContext = createContext(null); // null is the default value

export const LoginWrapper = (props) => {
    // Initialize a state variable and a function to update it
    const [currentLoginInfo,setCurrentLoginInfo] = useState(() => {
        // Use a function as the initial state to read from localStorage
        const storedValue1 = sessionStorage.getItem('authorization');
        const storedValue = storedValue1==null?localStorage.getItem('authorization'):storedValue1;
        return (storedValue=="null"?null:storedValue) || null;
    });
    const shouldPersist = useRef(false);

    // useEffect to update localStorage when the state changes
    useEffect(() => {
        shouldPersist.current
            ?sessionStorage.removeItem('authorization')
            :localStorage.removeItem('authorization')
        shouldPersist.current
            ?localStorage.setItem('authorization', currentLoginInfo)
            :sessionStorage.setItem('authorization', currentLoginInfo)
    }, [currentLoginInfo]);

    // Function to update the state
    const handleUpdateLoginInfo = (newValue) => {
        setCurrentLoginInfo(newValue);
    };


    const auth = (username,password,persist)=>{
        shouldPersist.current=persist;
        //const data = new URLSearchParams();
        const formData = new FormData();
        formData.append("un",username);
        formData.append("pw",password);
        axios.post("http://192.168.43.35:8081/api/v1/auth",formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
                /* 'Content-Type': 'application/x-www-form-urlencoded' */
            },
        }).then((response) => {
            console.log("authorized_?");
            console.log(response);
            handleUpdateLoginInfo(response.data.accessToken);
        }).catch((error) => {
            console.log(error)
            // handle errors
        });
    }

    const revokeToken = ()=>{
        handleUpdateLoginInfo(null)
    }

    const signup = (username,password)=>{
        const formData = new FormData();
        formData.append("un",username);
        formData.append("pw",password);
        axios.post("http://192.168.43.35:8081/api/v1/signup",formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then((response) => {
            console.log("signed_up?");
            console.log(response);
        }).catch((error) => {
            console.log(error)
            // handle errors
        });
    }


    return (
        <LoginContext.Provider value={{currentLoginInfo,auth,signup,revokeToken}}>
        {props.children}
        </LoginContext.Provider>
    );
};