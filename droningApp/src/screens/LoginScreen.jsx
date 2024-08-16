// import React, { useState, useEffect } from 'react';
// import { Alert, Image, StyleSheet, Text, TextInput, View, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
// import Header from '../components/Header';
// import Constants from "expo-constants";
// import RegisterButton from '../components/Buttons/RegisterButton';
// import LoginButton from '../components/Buttons/LoginButton';
// import GoogleButton from '../components/Buttons/GoogleButton';
// import FacebookButton from '../components/Buttons/FacebookButton';

// import { auth } from '../firebase/firebaseConfig'; // Asegúrate de que la configuración de Firebase esté correcta
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { useNavigation } from '@react-navigation/native';

// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const [buttonsVisible, setButtonsVisible] = useState(true);

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Alert.alert('Success', 'Logged in successfully');
//       navigation.navigate('Home'); // Cambia 'Home' por la pantalla a la que desees navegar después del login
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
//       setKeyboardVisible(true);
//       setButtonsVisible(false); // Oculta los botones cuando el teclado está visible
//     });
//     const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//       setKeyboardVisible(false);
//       setButtonsVisible(true); // Muestra los botones cuando el teclado se oculta
//     });

//     return () => {
//       keyboardDidHideListener.remove();
//       keyboardDidShowListener.remove();
//     };
//   }, []);

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <Header text="Skip"/>
//       <View style={styles.titleSection}>
//         <Text style={styles.title}>Iniciar Sesión a tu cuenta</Text>
//         <Text></Text>
//       </View>
//       <View style={[styles.inputsSection, { height: keyboardVisible ? "50%" : "33%" }]}>
//         <View>
//           <Text style={styles.inputTitle}> Email</Text>
//           <TextInput
//             style={styles.inputStyle}
//             placeholder="Entrar Email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />
//         </View>
//         <View>
//           <Text style={styles.inputTitle}>Contraseña</Text>
//           <TextInput
//             style={styles.inputStyle}
//             placeholder="Entrar Contraseña"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//         </View>
//       </View>
//       {keyboardVisible ? (
//         <View style={styles.buttonsSection}>
//           <LoginButton onPress={handleLogin} />
//         </View>
//       ) : (
//         <View style={styles.buttonsSection}>
//                     <LoginButton onPress={handleLogin} />

//           <RegisterButton text="Create an Account" onPress={() => navigation.navigate('Register')} />
//            <View style={styles.links}>
//             <Image style={styles.logo} source={require('../assets/images/googleIcon.png')}/>
//             <Image style={styles.logo} source={require('../assets/images/facebook.png')}/>
//           </View>
//         </View>
//       )}
//       <View style={styles.empty}></View>
//     </KeyboardAvoidingView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: Constants.statusBarHeight,
//     paddingHorizontal: 30
//   },
//   titleSection: {
//     height: "10%",
//     justifyContent: "space-between"
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1c1c1c"
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#3d3d3d"
//   },
//   inputsSection: {
//     height: "33%",
//     justifyContent: "space-around"
//   },
//   buttonsSection: {
//     height: "25%",
//     justifyContent: "space-around",
//     alignItems: "center"
//   },
//   inputTitle: {
//     paddingLeft: 23,
//     marginBottom: 10
//   },
//   inputStyle: {
//     backgroundColor: "white",
//     height: 50,
//     borderRadius: 15,
//     paddingLeft: 23
//   },
//   logo: {
//     width: 30,
//     height: 30
//   },
//   links: {
//     width: "50%",
//     flexDirection: "row",
//     justifyContent: "space-around"
//   },
//   empty: {
//     height: "20%"
//   }
// });
import React, { useState, useEffect } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, View, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header';
import Constants from "expo-constants";
import RegisterButton from '../components/Buttons/RegisterButton';
import LoginButton from '../components/Buttons/LoginButton';
import GoogleButton from '../components/Buttons/GoogleButton';
import FacebookButton from '../components/Buttons/FacebookButton';

import { auth } from '../firebase/firebaseConfig'; // Asegúrate de que la configuración de Firebase esté correcta
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await AsyncStorage.setItem('userEmail', user.email); // Guarda el correo del usuario en AsyncStorage
      Alert.alert('Success', 'Logged in successfully');
      navigation.navigate('Home'); // Cambia 'Home' por la pantalla a la que desees navegar después del login
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      setButtonsVisible(false); // Oculta los botones cuando el teclado está visible
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      setButtonsVisible(true); // Muestra los botones cuando el teclado se oculta
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header text="Skip"/>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Iniciar Sesión a tu cuenta</Text>
        <Text></Text>
      </View>
      <View style={[styles.inputsSection, { height: keyboardVisible ? "50%" : "33%" }]}>
        <View>
          <Text style={styles.inputTitle}> Email</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Entrar Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Contraseña</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Entrar Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>
      {keyboardVisible ? (
        <View style={styles.buttonsSection}>
          <LoginButton onPress={handleLogin} />
        </View>
      ) : (
        <View style={styles.buttonsSection}>
          <LoginButton onPress={handleLogin} />
          <RegisterButton text="Create an Account" onPress={() => navigation.navigate('Register')} />
          <View style={styles.links}>
            <Image style={styles.logo} source={require('../assets/images/googleIcon.png')}/>
            <Image style={styles.logo} source={require('../assets/images/facebook.png')}/>
          </View>
        </View>
      )}
      <View style={styles.empty}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 30
  },
  titleSection: {
    height: "10%",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1c1c1c"
  },
  subtitle: {
    fontSize: 14,
    color: "#3d3d3d"
  },
  inputsSection: {
    height: "33%",
    justifyContent: "space-around"
  },
  buttonsSection: {
    height: "25%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  inputTitle: {
    paddingLeft: 23,
    marginBottom: 10
  },
  inputStyle: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 15,
    paddingLeft: 23
  },
  logo: {
    width: 30,
    height: 30
  },
  links: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  empty: {
    height: "20%"
  }
});
