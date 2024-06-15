import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import PokemonCard from '../../components/PokemonCard/pokemonCard';
import useGetAsyncStoragePokemons from '../../services/asyncStorage/useGetAsyncStoragePokemons';
import { useNavigation } from '@react-navigation/native';
import useAsyncStorage from '../../services/asyncStorage/useAsyncStorage';

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

export default function Team() {
    const { pokemonDetails } = useGetAsyncStoragePokemons();
    const {clearOneData, clearAllData, getCapturedPokemon} = useAsyncStorage();
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);


    useEffect(() => {
        setPokemonList(pokemonDetails);
    }, [pokemonDetails]);

    const navigation = useNavigation();

    const handleClearOneData = async (pokemonId : number) => {
        await clearOneData(pokemonId);
        const updatedPokemonList = pokemonList.filter(pokemon => pokemon.id !== pokemonId);
        setPokemonList(updatedPokemonList);
        console.log('je clear le pokemon' + pokemonId, updatedPokemonList);
    }
    const handleClearAllData = async () => {
        await clearAllData();
        setPokemonList([]);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Button title="Clear all data" onPress={handleClearAllData} />
                {pokemonList.map((pokemon, index) => (
                    <View style={styles.card} key={index}>
                        <PokemonCard pokemon={pokemon} />
                        <TouchableOpacity>
                            <View style={styles.remove}>
                                <Button title="Clear" onPress={() => handleClearOneData(pokemon.id)} />
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        display: 'flex',
        width: '80%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    remove: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
});