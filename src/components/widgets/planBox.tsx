import React, {FC} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const PlanBox:FC =() => { 
  return (  
    <View style={styles.listBox}>
      <Text style={styles.text}>We are here</Text>
    </View>      
  );
};

const styles = StyleSheet.create({
  text:{
    fontFamily:'monospace',
    color:'#20232a',
    fontSize:18
  },
  listBox:{
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 22,
    marginTop: 7,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 3
  } 
});

export default PlanBox;
