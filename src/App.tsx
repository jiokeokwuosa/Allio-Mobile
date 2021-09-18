import React, {FC, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  ScrollView
} from 'react-native';
import PlanBox from './components/widgets/planBox';

const App:FC =() => {
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headingBox}><Text style={[styles.text, styles.headingText]}>Daily Planner</Text></View>
      <ScrollView contentContainerStyle={styles.scrollViewBox}>
        <PlanBox/>
        <PlanBox/>
        <PlanBox/>
        <PlanBox/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  text:{
    fontFamily:'monospace',
    color:'#20232a',
    fontSize:18
  },
  headingBox:{
    backgroundColor:'#191970',
    paddingVertical:20,
    paddingHorizontal:10
  },
  headingText:{
    color:'white',
    fontSize:24,
    textAlign:'center'
  },
  scrollViewBox:{
    flex:1,
    paddingHorizontal:5
  }
});

export default App;
