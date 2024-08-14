import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Constants from "expo-constants";
import RegisterButton from '../components/Buttons/RegisterButton';
import LoginButton from '../components/Buttons/LoginButton';
 const RegisterScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header text="Skip"/>
      <View style={styles.titleSection}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>
        Welcome Friend, enter your details so lets get started in ordening food
      </Text>
         <Text></Text>
      </View>
      <View style={styles.inputsSection}>
        <View>  
      <Text style={styles.inputTitle}>Email Address</Text>
      <TextInput style={styles.inputStyle} placeholder="Enter Email" />
      </View>
      <View >
         <Text style={styles.inputTitle}>Password</Text>
         <TextInput style={styles.inputStyle} placeholder="Enter Password" />
       </View>
       <View>
       <Text style={styles.inputTitle}>Confirm Password</Text>
          <TextInput placeholder="Confirm Password"
            style={styles.inputStyle}/>
    
       </View>
       <View>
 
       </View>
</View>
<View style={styles.buttonsSection}>
{/* <Pressable 
// style={styles.googleLogin}
>
         <Image
           source={require("../assets/google.png")}
          //  style={styles.logoGoogle}
         /> */}

         {/* <Text style={styles.textGoogle}> Sign in with Google</Text>
       </Pressable> */}
       <View></View>
       <RegisterButton text="Sign in with Google" />

<RegisterButton  text="Create an Account"/>
<LoginButton  />

</View>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //  alignItems: 'center',
    // justifyContent: 'center',,
    paddingTop: Constants.statusBarHeight  ,
paddingHorizontal:30
  },
  
  titleSection:{
    height:"17%",
    // backgroundColor:"blue",
justifyContent:"space-between"
  },
  title: {
    fontSize: 24,
    // paddingLeft:23,
    fontWeight:"bold",
    color:"#1c1c1c"
  },
  subtitle: {
    fontSize: 14,
    // paddingLeft:23,
    color:"#3d3d3d"
  },
  inputsSection:{
    height:"33%",
    // backgroundColor:"green",
    justifyContent:"space-between"

  },
  buttonsSection:{
    height:"38%",
    // backgroundColor:"yellow",
justifyContent:"space-evenly",
alignItems:"center"
  },
  inputTitle:{
    paddingLeft:23,
    marginBottom:10
      },
      inputStyle: {
        backgroundColor: "white",
        height: 50,
        borderRadius: 15,
        paddingLeft:23
      },
       

})