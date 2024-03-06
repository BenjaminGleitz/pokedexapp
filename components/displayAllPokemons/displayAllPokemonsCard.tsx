import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useGetAllPokemons from "../../services/getAllPokemons/useGetAllPokemons";
import PokemonCard from "../PokemonCard/pokemonCard";

export default function DisplayAllPokemonsCard() {
    const { pokemons } = useGetAllPokemons();

    return (

        <View style={styles.container}>
            {pokemons.map((pokemon, index) => (
                <PokemonCard key={index} pokemon={pokemon} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
