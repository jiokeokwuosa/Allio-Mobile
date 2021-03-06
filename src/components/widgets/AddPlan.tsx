import React, {FC,useState} from 'react';
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
import {addArticle} from './../../redux/actionCreators';

interface Props{
    show:boolean,
    setShow:(modalVisible: boolean)=>void,
    addArticle: (article: IArticle) => void    
}

const AddPlan:FC<Props> =({show,setShow, addArticle}) => { 
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [timeArea, setTimeArea] = useState('startTime');
   
    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setDatePickerVisibility(false)
        setShow(true)
        if(timeArea === 'startTime'){
          setStartTime(currentDate)
        }else{
          setEndTime(currentDate)
        }
    };

    const handleDateInputClick = (area:string) =>{
        setTimeArea(area)
        setShow(false)
        setDatePickerVisibility(true)
    }

    const handleAddTask = () =>{
        const data = {
          title,
          startTime,
          endTime
        }
        if(title && startTime && endTime){
          addArticle(data)
          setTitle('')
          setStartTime('')
          setEndTime('')
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
                    <Text style={[styles.text,styles.heading]}>Add New Task</Text>
                    <TextInput
                        style={[styles.text,styles.textInput]} 
                        placeholder='Type here...'
                        onChangeText={text => setTitle(text)}
                        defaultValue={title}
                    /> 
                    <View style={styles.timeBox}>
                      <Text style={[styles.text,styles.timeBoxText]} onPress={handleDateInputClick.bind(null,'startTime')}>{startTime? moment(startTime).format('h:mm:ss a') :'Set Start Time' }</Text>  
                      <Text style={[styles.text,styles.timeBoxText]} onPress={handleDateInputClick.bind(null,'endTime')}>{endTime?  moment(endTime).format('h:mm:ss a'): 'Set End Time'}</Text>  
                    </View>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={handleAddTask}
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


export default connect(null, {addArticle})(AddPlan);
