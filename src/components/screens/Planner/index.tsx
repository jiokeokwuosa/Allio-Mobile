import React, {FC, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { connect } from "react-redux";
import AddPlan from '../../widgets/AddPlan';
import Box from '../../widgets/PlanBox';

interface Props{
  articles:IArticle[]
}

const Planner:FC<Props> =({articles}) => {  
  const [modalVisible, setModalVisible] = useState(false);

  const planList = () => {
    if (articles && articles.length>0) {     
      return articles.map((item:any, index:number) => {
        return (
          <Box title={item.title} startTime={item.startTime} endTime={item.endTime} key={index} index={index}/>          
        );
      });
    } else {
      return <Text style={styles.center}>No exisiting plan for today</Text>;
    }
  };
  return (
    <>
    <View style={styles.container}>
      <View style={styles.headingBox}><Text style={[styles.text, styles.headingText]}>Daily Planner</Text></View>
      <View style={styles.topMenu}>
        <Text style={[styles.text, styles.addTask]} onPress={()=>setModalVisible(true)}>Add Task</Text>
        <Text style={[styles.text, styles.addTask]} onPress={()=>setModalVisible(true)}>View Time Chart</Text>
      </View>
     
      <ScrollView contentContainerStyle={styles.scrollViewBox}>
        {planList()}
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
  topMenu:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:15
  },
  center:{
    textAlign:'center'
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

const mapStateToProps = (state:any) => ({   
  articles: state.articles 
});

export default connect(mapStateToProps, null)(Planner);

