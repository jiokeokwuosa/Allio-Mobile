import React, {FC,useState, useEffect} from 'react';
import { 
  Modal,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from "react-redux";
import moment from "moment";
import {updateArticle} from '../../redux/actionCreators';

interface Props{
    show:boolean,
    setShow:(modalVisible: boolean)=>void,
    title:string,
    startTime:string,
    endTime:string,
    index:number
    updateArticle: (article: IArticle, articleIndex:number) => void    
}

const EditPlan:FC<Props> =({show,setShow, updateArticle, title, startTime, endTime, index}) => { 
    useEffect(() => {
      setNewTitle(title)
      setNewStartTime(startTime)
      setNewEndTime(endTime)      
    }, []);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const [newTitle, setNewTitle] = useState('');
    const [newStartTime, setNewStartTime] = useState('');
    const [newEndTime, setNewEndTime] = useState('');
    const [timeArea, setTimeArea] = useState('startTime');
   
    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setDatePickerVisibility(false)
        setShow(true)
        if(timeArea === 'startTime'){
          setNewStartTime(currentDate)
        }else{
          setNewEndTime(currentDate)
        }
    };

    const handleDateInputClick = (area:string) =>{
        setTimeArea(area)
        setShow(false)
        setDatePickerVisibility(true)
    }

    const handleUpdateTask = () =>{
        const data = {
          title:newTitle,
          startTime:newStartTime,
          endTime:newEndTime
        }
        if(newStartTime && newTitle && newEndTime){
          updateArticle(data,index)         
          setShow(false)
        }        
    }
    
    return ( 
        <> 
        {isDatePickerVisible?
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={onChange}                
            /> 
         :null
        }        
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}       
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={[styles.text,styles.heading]}>Edit Task</Text>
                    <TextInput
                        style={[styles.text,styles.textInput]} 
                        placeholder='Type here...'
                        onChangeText={text => setNewTitle(text)}
                        defaultValue={newTitle}
                    /> 
                    <View style={styles.timeBox}>
                      <Text style={[styles.text,styles.timeBoxText]} onPress={handleDateInputClick.bind(null,'startTime')}>{newStartTime? moment(newStartTime).format('h:mm:ss a') :'Set Start Time' }</Text>  
                      <Text style={[styles.text,styles.timeBoxText]} onPress={handleDateInputClick.bind(null,'endTime')}>{newEndTime?  moment(newEndTime).format('h:mm:ss a'): 'Set End Time'}</Text>  
                    </View>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={handleUpdateTask}
                    >                     
                    <View style={styles.submitButton}>
                        <Text style={[styles.text, styles.buttonText]}>ADD</Text>
                    </View>
                    </TouchableOpacity>   
                </View>
            </View>
        </Modal>        
        </> 
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
  textInput:{     
    height:40,
    borderBottomWidth:0.7,
    borderBottomColor:'black',
    marginBottom:10,
    fontSize:14,
    marginTop:10,
    width:'100%'
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
    marginTop: 7,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 15    
  },
  buttonText:{
    color:'white'   
  },
  timeBox:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      marginVertical:10
  },
  timeBoxText:{
      fontSize:12
  }
});


export default connect(null, {updateArticle})(EditPlan);
