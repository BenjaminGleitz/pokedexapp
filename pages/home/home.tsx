import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DisplayAllPokemonsCard from '../../components/displayAllPokemons/displayAllPokemonsCard';
import useGetOnePokemon from "../../services/getOnePokemon/useGetOnePokemon";

export default function Home() {

    const pokemonData = DisplayAllPokemonsCard();

    return (
        <ScrollView>
            <View style={styles.container}>
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
