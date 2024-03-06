import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DisplayAllPokemonsCard from '../../components/displayAllPokemons/displayAllPokemonsCard';

export default function Home() {

    const pokemonData = DisplayAllPokemonsCard();

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text>Home</Text>
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
