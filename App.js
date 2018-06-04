import React from 'react';
import { Dimensions,StyleSheet, Text, View } from 'react-native';
import CalButton from './CalButton.js';
import {Constants} from 'expo';
import { responsiveFontSize } from 'react-native-responsive-dimensions';



const DEVICE_WIDTH = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
        display : "0",
        numHistory: [],
        reset: false,
        operator: false
    }
  }
    
  /*
   * This method is used for when user pressed any of the numbers on the screen
   */
  numberPressed(number){
    if (this.state.reset){
        this.setState({
            display:number,
            reset:false
        })
    }
    else if (this.state.display != "0") {
        const displayNumTemp = this.state.display + number;
        this.setState({
            display: displayNumTemp,
        })
    }else {
        this.setState({
            display: number,
        })
    }
  }
  /*
   * This method is used to compute arithmetic operations that involve
   * two place operators like multiplication, addition, division.
   */
   twoPlaceOperator(operator) {
       console.log("you are here");
    if(this.state.display == "0" ){
        return;
    }else if (operator == "="){
        if (!this.state.numHistory[1]){
            console.log("undefined");
            console.log(this.state.numHistory);
            return;
        }
        console.log(this.state.numHistory);
        const operator = this.state.numHistory[1];
        let result = this.state.display;
        const firstNumber = parseFloat(this.state.numHistory[0]);
        const secondNumber = parseFloat(this.state.display);
        if (operator == "+") {result = firstNumber + secondNumber
        }else if (operator == "-"){
            result = firstNumber - secondNumber;
        }else if (operator == "✕"){
            result = firstNumber * secondNumber;
            result = result.toPrecision(6);

        }else if (operator == "÷"){
            result = firstNumber / secondNumber;
            result = result.toPrecision(6);
        }
        this.setState({
            display: result,
            numHistory: [],
            reset:true
        })
    } 
    else{
        console.log(this.state.numHistory);
        this.setState({
            numHistory:[ ...this.state.numHistory,this.state.display,operator],
            reset:true
        })      
    }
  }
  /*
   * This method is to clear any number on the screen 
   */
  clearScreen(){
      this.setState({
          display: "0",
          numHistory: [],
          reset: false
      })
  }
  /*
   *    This method is used for one place arithmetic operator like the % sign,
   *    or the . (dot) sign.
   *
   */
  onePlaceOperator(operator){
      let number = "";
      if (operator == "+/-"){
          number = -this.state.display;
      }
      else if(operator == "%" ){
          number = this.state.display * 0.01;
      }else if (operator == "."){
          if(this.state.display.includes(".")){
              return;
          }
          number = this.state.display + ".";
      }else{
          number = this.state.display;
      }
      this.setState({
        display: number,
        numHistory:[number]
       })
  }
  render() {
    return (
      <View style={styles.container}>
         <Text style = {styles.showing}> {this.state.display}</Text>
         <View style = {styles.rowStyle}>
            <CalButton  
                onPress = { () => this.clearScreen()} 
                title = "AC" 
                style = {{backgroundColor:"#9c9c9c"}}
                />
            <CalButton 
                onPress = { () => this.onePlaceOperator("+/-")}
                title = "+/-"
                style = {{backgroundColor:"#9c9c9c"}}
                />
            <CalButton
                onPress = { () => this.onePlaceOperator("%")}
                title = "%" 
                style = {{backgroundColor: "#9c9c9c"}}
                />
            <CalButton
                onPress = { () => this.twoPlaceOperator("÷")}
                title = "÷" 
                style = {{backgroundColor:"#ff8a02"}}
                textStyle = {{ fontSize: 50,color: "rgb(255,255,255)"}}/>
         </View>
          <View style = {styles.rowStyle}>
            <CalButton  
                onPress = { () => this.numberPressed("7")} 
                title = "7" 
                style = {{backgroundColor:"#2d2d2d"}}
                 textStyle = {{ color: "rgb(255,255,255)"}}/>
            <CalButton 
                onPress = { () => this.numberPressed("8")}
                title = "8"
                style = {{backgroundColor:"#2d2d2d"}}
                 textStyle = {{ color: "rgb(255,255,255)"}}/>
            <CalButton
                onPress = { () => this.numberPressed("9")}
                title = "9" 
                style = {{backgroundColor: "#2d2d2d"}}
                 textStyle = {{ color: "rgb(255,255,255)"}}/>
            <CalButton
                onPress = { () => this.twoPlaceOperator("✕")}
                title = "✕" 
                style = {{backgroundColor:"#ff8a02"}}
               textStyle = {{ color: "rgb(255,255,255)"}}/>   
              
        </View>
        <View style = {styles.rowStyle}>
            <CalButton  
                onPress = { () =>  this.numberPressed("4")} 
                title = "4" 
                style = {{backgroundColor:"#2d2d2d"}}
                 textStyle = {{ color: "rgb(255,255,255)"}}/>
                     
            <CalButton 
                onPress = { () =>this.numberPressed("5")}
                title = "5"
                style = {{backgroundColor:"#2d2d2d"}}
                 textStyle = {{ color: "rgb(255,255,255)"}}/>
            <CalButton
                onPress = { () => this.numberPressed("6")}
                title = "6" 
                style = {{backgroundColor: "#2d2d2d"}}
                 textStyle = {{ color: "rgb(255,255,255)"}}/>
            <CalButton
                onPress = { () => this.twoPlaceOperator("-")}
                title = "-" 
                style = {{backgroundColor:"#ff8a02"}}
                textStyle = {{ fontSize: 50,color: "rgb(255,255,255)"}}/>
                />
         </View>
         <View style = {styles.rowStyle}>
            <CalButton  
                onPress = { () => this.numberPressed("1")} 
                title = "1" 
                style = {{backgroundColor:"#2d2d2d"}}
                 textStyle = {{ color: "rgb(255,255,255)"}}/>

            <CalButton 
                onPress = { () => this.numberPressed("2") }
                title = "2"
                style = {{backgroundColor:"#2d2d2d"}}
                textStyle = {{ color: "rgb(255,255,255)"}}/>
            <CalButton
                onPress = { () => this.numberPressed("3")}
                title = "3" 
                style = {{backgroundColor:"#2d2d2d"}}
                textStyle = {{ color: "rgb(255,255,255)"}}/>
            <CalButton
                onPress = { () => this.twoPlaceOperator("+")}
                title = "+" 
                style = {{backgroundColor:"#ff8a02"}}
                 textStyle = {{ color: "rgb(255,255,255)"}}              />
         </View>
         <View style = {styles.rowStyle}>
            <CalButton  
                onPress = { () => this.numberPressed("0")} 
                title = "0" 
                style = {{backgroundColor:"#2d2d2d",width:170,alignItems: 'flex-start',paddingLeft:20}}
                textStyle = {{ color: "rgb(255,255,255)"}}
                />
            <CalButton
                onPress = { () => this.onePlaceOperator(".")}
                title = "." 
                style = {{backgroundColor: "#2d2d2d"}}
                textStyle = {{ color: "rgb(255,255,255)"}}
                />
            <CalButton
                onPress = { () => this.twoPlaceOperator("=")}
                title = "=" 
                style = {{backgroundColor:"#ff8a02"}}
                 textStyle = {{ color: "rgb(255,255,255)"}}              />
         </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#000000',
   // alignItems: 'center',
   // justifyContent: 'center',
  },
   showing: {
     backgroundColor: '#000000',
     color: 'white',
     paddingTop: 10+ Constants.statusBarHeight,
     width: DEVICE_WIDTH,
     fontSize: responsiveFontSize(10),
     paddingLeft:10,
     paddingRight:30,
     textAlign: 'right',
      flex: 1
   },
    rowStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
});
