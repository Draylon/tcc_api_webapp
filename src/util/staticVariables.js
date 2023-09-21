import React from 'react';

const ContextContainer = React.createContext(null);
const initialAppState = {};
let i_=1;
let id_ = ()=>{return i_++;}

export {ContextContainer,initialAppState,id_};