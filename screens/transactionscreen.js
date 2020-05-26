import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
export default class transactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermissions:null,
       scanned:false,
        
        buttonState:'normal',
         scanBookId:'',
         scanStudentId:'',
        }

      
  }
  getCameraPermissions = async(id)=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions:status==="granted",
      buttonState:id,
      scanned:false
    })
  }
  handleBarcodeScan = async({type,data})=>{
    const {buttonState} = this.state
    if(buttonState==="BOOKID"){
    this.setState({scanned:true,scanBookId:data, buttonState:'normal'})
  }
  else if(buttonState==="STUDENTID"){
    this.setState({
      scanned: true,
      scanStudentId: data,
      buttonState: 'normal'
    });
}
  }
    render(){
const hasCameraPermissions=this.state.hasCameraPermissions;
const scanned = this.state.scanned;    
const buttonState = this.state.buttonState;
if(buttonState!=="normal" && hasCameraPermissions){
  return(
    <BarCodeScanner
     onBarCodeScanned={scanned?undefined:this.handleBarcodeScan}
    style = {StyleSheet.absoluteFillObject}/>
    
  )
}
else if(buttonState==="normal"){
return (
    <View style={styles.container}>
      <View>
        <Image 
        source={require('../assets/booklogo.jpg')} 
        style={{width:30,height:45}}/>
        <Text style = {{textAlign:'center',fontSize:20}}>wirlib</Text></View>      
       
       
        <View style={styles.inputView}>
        <TextInput style={styles.inputBox}
        placeholder="BOOKID" value={this.state.scanBookId}/>
         <TouchableOpacity style={styles.scanButton} 
         onPress={()=>{this.getCameraPermissions("BOOKID")}}>  
         <Text style={styles.buttonText}>Scan </Text>
         </TouchableOpacity>
         </View>


         <View style={styles.inputView}>
        <TextInput style={styles.inputBox}
        placeholder="STUDENTID" 
        value={this.state.scanStudentId}/>
         <TouchableOpacity style={styles.scanButton} 
         onPress={()=>{this.getCameraPermissions("STUDENTID")}}>
           <Text style={styles.buttonText}>Scan</Text>
         </TouchableOpacity>
         </View>
       
    </View>
  );
}
}
}
const styles = StyleSheet.create({container:{
  flex:1,
  justifyContent:'center',
  alignItems:'center'},
displayText:{
  fontSize : 20,
  textDecorationLine:'underline',
},
scanButton:{
  backgroundColor:'red',
  margin:10,
},
buttonText:{
  fontSize:22,
},
inputView:{
flexDirection:'row',
margin:25,
},
inputBox:{
  width:120,
  height:20,
  borderWidth:2,
  fontSize:18,
},

})
