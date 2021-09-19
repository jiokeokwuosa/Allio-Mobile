import React, {FC} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

interface Props{
  title:string
}

const PlanBox:FC<Props> =({title}) => { 
  return (  
    <View style={styles.listBox}>
      <Text style={[styles.text, styles.textPad]}>{title}</Text>
      <View>
        <Text>Edit</Text>
        <Text>Delete</Text>
      </View>      
    </View>      
  );
};

const styles = StyleSheet.create({
  text:{
    fontFamily:'monospace',
    color:'#20232a',
    fontSize:18
  },
  textPad:{
    marginTop:7
  },
  listBox:{
    flexDirection:'row',
    justifyContent:'space-between',
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
