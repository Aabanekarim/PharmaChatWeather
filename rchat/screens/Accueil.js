import { View, Text, StyleSheet, TextInput,Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton/CustomButton';

const Accueil = ({ route }) => {
  const { userId, userName } = route.params;
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [operation, setOperation] = useState('');
  const [d,setD]= useState('');
  const [quartier,setQuartier] = useState('');
  const [phrases, setPhrases] = useState([
    '1:garde24',
    '2:nuit',
    '3:jour',
  ]);
  const onRefreshPressed = () => {
    navigation.replace('Accueil', { userId, userName });
  };

  const onLogoutPressed = () => {
    navigation.navigate('Home');
  };

  const onSendMessage = async () => {
    if (message) {

      if (message=="1"){

      }
      else if(message=="2"){
        if(operation!="2-1" && operation!="2-2"){
        const updatedConversation = [...conversation, { role: 'user', content: message }];
        setConversation(updatedConversation);
        setOperation('2-1');
        const updatedConversationWithBotReply = [...updatedConversation, { role: 'bot', content: phrases }];
        setConversation(updatedConversationWithBotReply);
        setOperation('2-1');
        }
        
      }else if(operation=="2-1"){
          
          const updatedConversation = [...conversation, { role: 'user', content: message }];
          setConversation(updatedConversation);
          setOperation('2-2');
          const updatedConversationWithBotReply = [...updatedConversation, { role: 'bot', content: phrases }];
          setConversation(updatedConversationWithBotReply);
          setOperation('2-2');
        }
        else if(operation=="2-2"){}
      else{
      const updatedConversation = [...conversation, { role: 'user', content: message }];
      setConversation(updatedConversation);
      try {
        const response = await fetch('http://192.168.11.105:3000/chatgpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message })
        });
        const data = await response.json();
        const botReply = data.res;
        const updatedConversationWithBotReply = [...updatedConversation, { role: 'bot', content: botReply }];
        setConversation(updatedConversationWithBotReply);
      } catch (error) {
        console.error(error);
      }
      setMessage('');
    }}
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image source={require('./bk.png')} style={styles.logo} />
        <CustomButton text="Rafraîchir" onPress={onRefreshPressed} style={styles.button1} />
        <CustomButton text="Déconnexion" onPress={onLogoutPressed} style={styles.button2} />
      </View>

      <View style={styles.body}>
        <ScrollView style={styles.messageList}>
          <View style={styles.welcomeMessageContainer}>
            <Text style={styles.welcomeMessageText1}>
              Bonjour {userName}
            </Text>
            <Text style={styles.welcomeMessageText}>
              Entrez un nombre :
            </Text>
            <Text style={styles.welcomeMessageText}>
              1: La météo de Casablanca aujourd'hui
            </Text>
            <Text style={styles.welcomeMessageText}>
              2: Les pharmacies de Casablanca ouvertes aujourd'hui
            </Text>
            <Text style={styles.welcomeMessageText}>
              3: Question & Réponse
            </Text>
          </View>

          {conversation.map((message, index) => (
            <View
              key={index}
              style={
                message.role === 'user'
                  ? styles.userMessageContainer
                  : styles.botMessageContainer
              }
            >
              <Text
                style={
                  message.role === 'user'
                    ? styles.userMessageText
                    : styles.botMessageText
                }
              >
                {message.content}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Saisissez un message..."
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={onSendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSendMessage}>
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(252, 220, 241)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    backgroundColor: '#7a7a7a',
  },
  button2: {
    marginLeft:0,
    marginRight: 0,
    paddingRight: 0,
  },
  button: {
    flex: 1,
    Color: 'purple',
    marginHorizontal: 5,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'RGB(252, 220, 241)',
  },
  messageList: {
    flex: 1,
  },
  welcomeMessageContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    marginLeft: 0,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  welcomeMessageText: {
    
    color: 'black',
    fontWeight: 'bold',
  },
  welcomeMessageText1: {
    
    color: 'red',
    fontWeight: 'bold',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#7ac5cd',
    color:'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    borderRadius: 10,
    
  },
  userMessageText: {
    color: 'black',
  },
  botMessageText: {
    color: 'black',
    fontWeight: 'bold',

  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#d5d5d5',
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  sendButton: {
    backgroundColor: '#7ac5cd',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 30,
    marginLeft: -50, // Ajustez cette valeur selon vos préférences
    marginRight: 0,

  },
});

export default Accueil;