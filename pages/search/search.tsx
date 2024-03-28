import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';

export default function Search() {
    const navigation = useNavigation();
    const [isSpeaking, setIsSpeaking] = useState(false);

    const toggleSpeaking = () => {
        if (isSpeaking) {
            console.log("Lecture terminée");
            setIsSpeaking(false);
            Speech.stop();
        } else {
            console.log("Début de la lecture");
            setIsSpeaking(true);
            Speech.speak("petite merde ", {
                voice: 'com.apple.eloquence.en-GB.Rocko',
                onDone: () => console.log('Lecture terminée')
            });
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Press to hear some words" onPress={toggleSpeaking}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});
