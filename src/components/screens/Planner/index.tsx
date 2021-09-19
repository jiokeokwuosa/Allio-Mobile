import React, {FC, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  ScrollView
} from 'react-native';
import AddPlan from '../../widgets/AddPlan';
import Box from '../../widgets/PlanBox';

const Planner:FC =() => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
    <View style={styles.container}>
      <View style={styles.headingBox}><Text style={[styles.text, styles.headingText]}>Daily Planner</Text></View>
      <Text style={[styles.text, styles.addTask]} onPress={()=>setModalVisible(true)}>Add Task</Text>
      <ScrollView contentContainerStyle={styles.scrollViewBox}>
        <Box title='Make Breakfast : 20:00'/>
        <Box title='Dress the Bed : 20:30'/>
        <Box title='Swimming'/>
        <Box title='Swimming'/>
        <Box title='Swimming'/>
        <Box title='Swimming'/>      
      </ScrollView>
    </View>
    <AddPlan show={modalVisible} setShow={setModalVisible}/>
    </>
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
  addTask:{
   textAlign:'center',
   textDecorationColor:'red',
   textDecorationStyle:'solid',
   textDecorationLine:'underline',
   marginTop:20
  },
  headingBox:{
    backgroundColor:'#191970',
    paddingVertical:20,
    paddingHorizontal:10,
    paddingTop:40,
  },
  headingText:{
    color:'white',
    fontSize:24,
    textAlign:'center'
  },
  scrollViewBox:{
    flex:1,
    paddingHorizontal:5,
    marginTop:20
  }  
});

export default Planner;
