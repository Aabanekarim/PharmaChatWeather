import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButtonStarted from '../CustomButtonStarted/CustomButtonStarted'; 

const HomeScreen = () => {
    const navigation = useNavigation();
    const onGetStartedPressed = () => {
        navigation.navigate('Sign in');
    }

    return (
        <View style={styles.root}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../logo.jpg')} resizeMode="contain" />
            </View>
            <View style={styles.buttonContainer}>
                <CustomButtonStarted text="Get Started" onPress={onGetStartedPressed} style={styles.getStartedButton} />
            </View>
            <View style={styles.cercleWrapper}>
                <View style={styles.overlapGroup}>
                    <View style={styles.ellipse} />
                    <View style={styles.ellipse2} />
                </View>
            </View>
        </View>
    )
}

const { width } = Dimensions.get('window');
const logoSize = width * 0.8; // Ajuster la taille du logo en fonction de la largeur de l'appareil

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(252, 244, 241)',
    },
    logoContainer: {
        height: logoSize + 16, // Ajouter la hauteur du logo plus la marge inférieure
        alignItems: 'center',
        justifyContent: 'flex-end', // Aligner le logo en bas du conteneur
    },
    logo: {
        width: logoSize,
        height: '70%',
        marginTop: 16, // Ajouter une marge supérieure pour créer un espace entre le bouton et le logo
    },
    buttonContainer: {
        position: 'absolute',
        top: '80%', // Déplacer le bouton vers le haut (moitié de la taille du logo)
        alignItems: 'center',
        width: '100%',
    },
    getStartedButton: {
        width: '80%',
        backgroundColor: '#4DB6F1',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    cercleWrapper: {
        position: 'absolute',
        top: -100,
        left: -75,
        width: 300,
        height: 263,
    },
    overlapGroup: {
        position: 'relative',
        height: 263,
    },
    ellipse: {
        position: 'absolute',
        top: 63,
        left: 0,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#4DB6F178',
    },
    ellipse2: {
        position: 'absolute',
        top: 0,
        left: 100,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#4DB6F178',
    },
});

export default HomeScreen;