import React, {FC, useEffect, useState} from 'react';
import { 
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from "react-redux";
import moment from "moment";
import { VictoryBar } from "victory-native";
import { PieChart} from 'react-native-chart-kit'



interface Props{
    show:boolean,
    setShow:(modalVisible: boolean)=>void,
    articles?:IArticle[],
    chatInfo:Array<object>
}

const ChartBox:FC<Props> =({show,setShow, articles,chatInfo},chatData:any) => {  
    const [chatData1, setChatData1] = useState<any>([]);
    useEffect(() => {
      prepareChartData()
     
    },[]);
    console.log(chatInfo)
    
    const prepareChartData = () =>{     
        chatData = articles?.map((article)=>{
        let start = moment(article.startTime);
        let end = moment(article.endTime);
        let diff = end.diff(start, 'seconds') /3600      
        return {
            name:article.title,
            population:diff
        }
      })    
      setChatData1(chatData)
  
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
                      {chatInfo && chatInfo.length>0?
                      <PieChart
                      data={chatInfo}
                      width={Dimensions.get('window').width-10}
                      height={220}
                      chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16
                        }
                      }}
                      accessor="population"
                      backgroundColor="transparent"
                      paddingLeft="15"
                      absolute
                    />
                      :null}                   
                    </View>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={exitChart}
                    >                     
                    <View style={styles.submitButton}>
                        <Text style={[styles.text, styles.buttonText]}>Close Chat</Text>
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
    width:'100%'
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
