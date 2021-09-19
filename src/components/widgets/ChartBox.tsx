import React, {FC, useEffect, useState} from 'react';
import { 
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import moment from "moment";
import { VictoryBar } from "victory-native";



interface Props{
    show:boolean,
    setShow:(modalVisible: boolean)=>void,
    articles?:IArticle[]
}

const ChartBox:FC<Props> =({show,setShow, articles},chatData:any) => {  
    // const [chatData, setChatData] = useState<any>([]);
    useEffect(() => {
      prepareChartData()
    }, []);
    
    
    const prepareChartData = () =>{     
        chatData = articles?.map((article)=>{
        let start = moment(article.startTime);
        let end = moment(article.endTime);
        let diff = end.diff(start, 'seconds') /3600      
        return {
            x:article.title,
            y:diff
        }
      })    
     
      console.log(chatData)
    }

    const exitChart = () =>{
      setShow(false)
    }
    return (  
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}       
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>Time Chat in Minutes</Text>
                    <View>
                    <VictoryBar
                      data={chatData}
                      width={250}
                      height={250}                     
                      style={{
                      labels: {
                      fill: 'white', fontSize: 15, padding: 7,
                      }, }}
                    /> 
                    </View>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={exitChart}
                    >                     
                    <View style={styles.submitButton}>
                        <Text style={[styles.text, styles.buttonText]}>Yes</Text>
                    </View>
                    </TouchableOpacity>   
                </View>
            </View>
        </Modal> 
    );
};

const styles = StyleSheet.create({ 
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',     
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:'80%'
  },
  heading:{
      fontSize:20
  },
  text:{
    fontFamily:'monospace',
    color:'#20232a',
    fontSize:18
  },
  submitButton:{
    backgroundColor: '#6A5ACD',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 15,    
  },
  buttonText:{
    color:'white'
  } 
});

const mapStateToProps = (state:any) => ({   
  articles: state.articles 
});

export default connect(mapStateToProps, null)(ChartBox);
