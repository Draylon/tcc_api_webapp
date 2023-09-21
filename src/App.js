
import React, { useState, useContext, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './appSearchBar.css';
import MainFooter from './pages/fragments/mainFooter';
import MainHeader from './pages/fragments/mainHeader';
import MainSection from './pages/fragments/mainSection';

import './util/WithScrollbar.css';
import axios from 'axios';

import {ContextContainer,initialAppState} from './util/staticVariables';

export default function App(){
  const [appState, updateAppState] = useState(initialAppState);


  const [initialize,setInitialize] = useState(true);

  useEffect(()=> {
      const load = async () => {
          const ip_resp = await axios.get("https://api.ipify.org/?format=json").then(ipResponse =>{
              return ipResponse.data;
          }).catch(e=>{
            console.error(e);
            return null;
          })
          const loc_resp = ip_resp==null?null:
          await axios.get("http://192.168.0.4:8081/api/v1/util/geocoding/"+ip_resp.ip).then(locationDataResponse => {
            return locationDataResponse.data;
          }).catch(e=>{
            console.error(e);
            return null;
          })
          updateAppState({ ...appState, locationData: loc_resp,ipData: ip_resp })
          /* const responseData = await axios.get("http://127.0.0.1:5000/animals_cars")
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          }); */
          setInitialize(false);
        }
      if (initialize) {
          load();
      }
  },[initialize]);


  return(
    <div className='wrapper'>
      <ContextContainer.Provider value={{ appState, updateAppState }}>
        <MainHeader/>
        <MainSection/>
        <MainFooter/>
      </ContextContainer.Provider>
    </div>
  )
};


/* class App123 extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      stonks:0

    }
    this.raisestonks = this.raisestonks.bind(this);
  }

  raisestonks() {
    this.setState({
      stonks:this.state.stonks+1
    })
      
  }

  render(){
    return(
      <div className='wrapper'>
        <MainHeader></MainHeader>
        <MainSection></MainSection>
        <MainFooter></MainFooter>
      </div>
    );
  }
} */


//=--=========---==========---============---===============---================
//=--=========---==========---============---===============---================
//=--=========---==========---============---===============---================
//=--=========---==========---============---===============---================


/* 

constructor(props) {
  super(props);
  this.state = {
    age:0
  this.incrementAge = this.incrementAge.bind(this)
}

incrementAge(){
  this.setState({
    age:this.state.age + 1;
  });
}

render(){
  return(
    <div>
      <label>My age is: {this.state.age}</label>
      <button onClick={this.incrementAge}>Grow me older !!<button>
    </div>
  );
}





extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        age:0
      this.incrementAge = this.incrementAge.bind(this)
    }

    incrementAge(){
      this.setState({
        age:this.state.age + 1;
      });
    }

    render(){
      return(
        <div>
          <label>My age is: {this.state.age}</label>
          <button onClick={this.incrementAge}>Grow me older !!<button>
        </div>
      );
    }
  }






  import React, { Component } from 'react';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.sayHello = this.sayHello.bind(this);
  }

  sayHello() {
    alert('Hello!');
  }
  
  return (
    <button onClick={this.sayHello}>
      Click me!
    </button>
  );
}





<button onClick={this.sayHello}>
      Click me!
    </button> */