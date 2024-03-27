import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import useGetPokemon from '../../services/getOnePokemon/useGetOnePokemon';
import { useRoute } from "@react-navigation/native";
import { Accelerometer } from "expo-sensors";

interface EvolutionProps {
    pokemonId: number;
}

interface Pokemon {
    id: number;
    pokedexId: number;
    name: string;
    image: string;
    sprite: string;
    slug: string;
    stats: {
        HP: number;
        attack: number;
        defense: number;
        special_attack: number;
        special_defense: number;
        speed: number;
    };
    apiTypes: {
        name: string;
        image: string;
    }[];
    apiGeneration: number;
    apiResistances: {
        name: string;
        damage_multiplier: number;
        damage_relation: string;
    }[];
    apiEvolutions: {
        name: string;
        pokedexId: number;
    }[];
    apiPreEvolution: string | "none" | {
        name: string;
        pokedexIdd: number;
    };
}

export default function Evolution() {
    const route = useRoute();
    const { pokemonId } = route.params as EvolutionProps;
    const { pokemon, loading } = useGetPokemon(pokemonId);
    const [pokemonToDisplay, setPokemonToDisplay] = useState<Pokemon | null>(pokemon);

    const pokemonEvolution = useGetPokemon(pokemon?.apiEvolutions[0].pokedexId || 0);

    useEffect(() => {
        if (!loading && pokemon) {
            setPokemonToDisplay(pokemon);
        }
    }, [pokemon, loading]);

    useEffect(() => {
        let subscription: any;

        const handleShake = async () => {
            console.log('Shake detected!');
            if (pokemonEvolution) {
                setPokemonToDisplay(pokemonEvolution.pokemon);
            }
        };

        subscription = Accelerometer.addListener(({ x, y, z }) => {
            const acceleration = Math.sqrt(x * x + y * y + z * z);
            if (acceleration > 3) {
                handleShake();
            }
        });

        return () => {
            subscription && subscription.remove();
        };
    }, [pokemonEvolution]);

    if (loading || !pokemonToDisplay) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: pokemonToDisplay.image }}
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
