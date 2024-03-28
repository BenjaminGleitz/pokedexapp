import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image, Text, Animated} from 'react-native';
import useGetPokemon from '../../services/getOnePokemon/useGetOnePokemon';
import {useRoute} from "@react-navigation/native";
import {Accelerometer} from "expo-sensors";

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
    const {pokemonId} = route.params as EvolutionProps;
    const {pokemon, loading} = useGetPokemon(pokemonId);
    const [shakeDetected, setShakeDetected] = useState(false);
    const pokemonEvolution = useGetPokemon(pokemon?.apiEvolutions[0].pokedexId || 0);

    const opacityCurrentPokemon = useRef(new Animated.Value(1)).current;
    const opacityEvolutionPokemon = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let subscription: any;

        const handleShake = async () => {
            if (!shakeDetected) {
                console.log('Shake detected!');
                setShakeDetected(true);
                Animated.sequence([
                    Animated.timing(opacityCurrentPokemon, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityEvolutionPokemon, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    })
                ]).start(() => {
                    setShakeDetected(false);
                });
            }
        };

        subscription = Accelerometer.addListener(({x, y, z}) => {
            const acceleration = Math.sqrt(x * x + y * y + z * z);
            if (acceleration > 3) {
                handleShake();
            }
        });

        return () => {
            subscription && subscription.remove();
        };
    }, [shakeDetected]);

    if (loading || !pokemon || !pokemonEvolution.pokemon) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.Image
                style={[styles.image, {opacity: opacityCurrentPokemon}]}
                source={{uri: pokemon.image}}
            />
            <Animated.Image
                style={[styles.imageEvolution, {opacity: opacityEvolutionPokemon}]}
                source={{uri: pokemonEvolution.pokemon.image}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFC562',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 200,
        height: 200,
        marginLeft: -100,
        marginTop: -100,
    },
    imageEvolution: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 400,
        height: 400,
        marginLeft: -200,
        marginTop: -200,
    },
});


