import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import Contants from 'expo-constants';
import Accueil from './screens/Accueil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const stack = createStackNavigator()
 function App() {
  return (
    <View style={styles.container}>
      <stack.Navigator screenOptions={{headerShown : false}}>
        <stack.Screen name = "Home" component = {HomeScreen}/>
        <stack.Screen name = "Sign in" component = {SignInScreen}/>
        <stack.Screen name = "Accueil" component = {Accueil}/>
      </stack.Navigator>
    </View>
  );
}

export default() =>{
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eddfdf',
    marginTop:Contants.statusBarHeight
  },
});