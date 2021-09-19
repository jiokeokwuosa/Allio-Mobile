import React, {FC, useEffect} from 'react';
import { Provider } from "react-redux";
import store from "./redux/";
import {
  StatusBar 
} from 'react-native';
import DailyPlan from './components/screens/Planner';

const App:FC =() => {
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);
  return (
    <Provider store={store}>
       <DailyPlan /> 
    </Provider>
  )
};



export default App;
