import React from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import DisplayAllPokemonsCard from '../../components/displayAllPokemons/displayAllPokemonsCard';
import {useNavigation} from "@react-navigation/native";
export default function Home() {

    const pokemonData = DisplayAllPokemonsCard();

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Team')
    };

    const handlePressSearch = () => {
        navigation.navigate('Search')
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Button title="My Team" onPress={() => handlePress()}/>
                <Button title="Search" onPress={() => handlePressSearch()}/>
                {pokemonData}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
