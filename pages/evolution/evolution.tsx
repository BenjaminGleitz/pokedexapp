import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import useGetPokemon from '../../services/getOnePokemon/useGetOnePokemon';
import { useRoute } from "@react-navigation/native";
import useGetOnePokemonEvolutions from "../../services/getOnePokemonEvolutions/useGetOnePokemonEvolutions";

interface EvolutionProps {
    pokemonId: number;
}

export default function Evolution() {
    const route = useRoute();
    const { pokemonId } = route.params as EvolutionProps;
    const { pokemon, loading } = useGetPokemon(pokemonId);

    useEffect(() => {
        async function fetchEvolution() {
            if (pokemon && pokemon.apiEvolutions && pokemon.apiEvolutions.length > 0) {
                const evolutionData = await useGetOnePokemonEvolutions(pokemon.apiEvolutions[0].pokedexId);
                console.log('evolution', evolutionData);
            }
        }
        fetchEvolution();
    }, [pokemon]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!pokemon) {
        return (
            <View style={styles.container}>
                <Text>Error: Failed to fetch Pokémon data</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: pokemon.image }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});
