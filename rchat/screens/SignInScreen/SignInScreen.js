import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput/CustomInput';

const SignInScreen = () => {
  const [emailaddress, setEmailaddress] = useState('');
  const [password, setPassword] = useState('');
  const [op, setOp] = useState('');

  const navigation = useNavigation();
  const onSignInPressed = async () => {
    try {
      const response = await fetch('http://192.168.1.102:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: emailaddress, password: password })
      });

      const data = await response.json();
      console.log('Response:', data); // Vérifier la valeur de la réponse JSON

      if (data.status === 'success') {
        console.log('Redirecting to Accueil'); // Vérifier si la redirection est censée se produire
        navigation.navigate('Accueil', { userId: data.id, userName: data.name });
      } else {
        console.log('Authentication failed'); // Vérifier si l'authentification a échoué
        setOp('name ou mot de passe incorrect');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.root}>
      <Image source={require('../../logo.jpg')} style={styles.logo} />
      <CustomInput placeholder="Name" value={emailaddress} setValue={setEmailaddress} />
      <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
      <CustomButton text="Sign In" onPress={onSignInPressed} />
      <View style={styles.errorContainer}>
        {op ? <Text style={styles.errorMessage}>{op}</Text> : null}
      </View>
    </View>
  );
  };
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(252, 244, 241)'
  },
  errorMessage: {
    color: 'red',
    marginTop: 20, // Ajustez cette valeur selon vos besoins
  },
  cercleWrapper: {
    position: 'absolute',
    top: -100,
    left: -75,
    width: 300,
    height: 263
  },
  overlapGroup2: {
    position: 'relative',
    height: 263
  },
  ellipse: {
    position: 'absolute',
    top: 63,
    left: 0,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#4DB6F178'
  },
  ellipse3: {
    position: 'absolute',
    top: 0,
    left: 100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#4DB6F178'
  },
  errorContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  
});

export default SignInScreen