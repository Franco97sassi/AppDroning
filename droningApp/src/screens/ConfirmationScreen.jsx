 
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import HeaderLogged from "../components/Headers/HeaderLogged";
// import RegisterButton from "../Buttons/RegisterButton";
import CheckBox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el ícono de FontAwesome

const ConfirmationScreen = ({ route }) => {
    const [isChecked, setIsChecked] = useState(false);
    const { pickupAddress, deliveryAddress, arrivalTime } = route.params;
    const navigation = useNavigation();
    const handleCancel = () => {
      navigation.goBack(); // Regresar a la pantalla anterior
    };
    
    const handleConfirm = () => {
      navigation.navigate('Following', {
        pickupAddress: pickupAddress,
        deliveryAddress: deliveryAddress, 
      } );
       
    };
  return (
    <View style={styles.container}>
      <HeaderLogged />
      <View style={styles.deliverOrder}>
        <Text style={styles.title}>Orden #1</Text>

        <View style={styles.details}>
        <Image
              source={require('../../assets/images/drones.png')} // Imagen del dron
              style={styles.dronImage}
            />
          {/* <Text style={styles.subtitle}>Dron</Text> */}
          <View style={styles.inputContainer}>
            <Text style={styles.subtitleAddress}> 1 </Text>
          </View>
        </View>
        <View style={styles.details}>
        <Icon
              name="user" // Nombre del ícono para el piloto
              size={30}
              color="black" // Color del ícono
              // style={styles.pilotIcon}
              style={{ marginLeft: 10 }}
            />
          {/* <Text style={styles.subtitle}>Piloto</Text> */}
          <View style={styles.inputContainer}>
            <Text style={styles.subtitleAddress}>Juan Doe</Text>
          </View>
        </View>
        <View style={styles.details}>
           
          <Text style={styles.llegada}>Tiempo de llegada Estimado:</Text>
           <Text style={styles.llegada}> {arrivalTime}</Text>
        </View>
        <Text> </Text>
      </View>
      {/*  <View style={styles.priceContainer}>
      <View style={styles.details}>
           
           <Text style={styles.subtitle}>Subtotal</Text>
            <Text style={styles.subtitle2}>$20</Text>
         </View>
           <View style={styles.details}>
            
           <Text style={styles.subtitle}>Delivery Fee</Text>
            <Text style={styles.subtitle2}>$2000</Text>
         </View>
         <View style={styles.divider} /> 

         <View style={styles.detailsTotal}>
            
            <Text style={styles.subtitle}>Total</Text>
             <Text style={styles.subtitle3}>$2020</Text>
          </View>  
      </View>*/}

      {/* <View style={styles.paymentContainer}>
      <View><Text style={styles.title}>Payment</Text></View>
     <View style={styles.cardsContainer}> 
      <Image source={require("../../assets/images/mastercard.png")} style={styles.logo}/>   
      <Image source={require("../../assets/images/paypal.png")} style={styles.logo}/>   
      <Image source={require("../../assets/images/stripe.png")} style={styles.logo}/>  
      </View> 
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={setIsChecked}
          style={styles.checkbox}
        />
        <Text style={styles.subtitle}>Pay on arrival</Text>
      </View>
      
            </View> */}
      <View style={styles.confirmation}>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:"center",
    // alignItems:"center",
    // backgroundColor: "green",
     paddingHorizontal: 26,

  },
  deliverOrder: {
    // backgroundColor: "blue",
    height: "25%",
    //  paddingHorizontal: 26,
    justifyContent: "space-between",
  },
  llegada:{
    color:"green",
    fontWeight:"900", fontSize:15,
  },
  divider: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",  alignItems: "center",   
  },
  detailsTotal:{
    paddingTop:10,
    flexDirection: "row", alignItems: "center",      
color:"#4682B4",
    justifyContent: "space-between",
fontSize:18
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
     color : '#4682B4', // Cambiar según la necesidad
  },
  subtitle: {
    fontSize: 15,
    // fontWeight: 'bold',
    // color: '#fff', // Cambiar según la necesidad
    //  backgroundColor:"red",
    },
   subtitleAddress:{
    fontSize: 15,
    fontWeight: 'bold',
     
   },
   inputContainer: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    
    // flex: 1,
    justifyContent: 'center',
  },
  subtitle2: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#fff', // Cambiar según la necesidad
  },
  subtitle3: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: '#fff', // Cambiar según la necesidad
  },
  paymentContainer:{
    height:"28%",
    // backgroundColor:"yellow",
     alignItems:"flex-start",
    justifyContent:"space-evenly"
  },
  cardsContainer:{
    // backgroundColor:"red",
    flexDirection:"row",
    width:"100%",
    alignItems:"center",
    justifyContent:"space-evenly"
  },
  priceContainer:{
    height:"12%",
    // backgroundColor:"cyan",
    justifyContent: "space-between",
    // alignItems:"center"
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   },
   checkbox: {
    marginRight: 10,
  },
  confirmation:{
    //  backgroundColor:"black",
    height:"20%",
    justifyContent:"space-around",
    alignItems:"center"

  },
  logo:{
    width:50,
    height:50
  },
  cancelButton: {
    borderRadius:20,
    backgroundColor:"white",
    width:335,
    height:51,
     justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    borderRadius:20,
    backgroundColor:"#4682B4",
    width:335,
    height:51,
     justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConfirmationScreen;
