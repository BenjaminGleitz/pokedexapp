import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Button} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import useGetPokemon from '../../services/getOnePokemon/useGetOnePokemon';
import useGetOnePokemonEvolutions from "../../services/getOnePokemonEvolutions/useGetOnePokemonEvolutions";
import useGetOnePokemonPreEvolutions from "../../services/getOnePokemonPreEvolutions/useGetOnePokemonPreEvolutions";
import useAsyncStorage from "../../services/asyncStorage/useAsyncStorage";

interface Evolution {
    id: number;
    name: string;
    image: string;
};

interface PreEvolution {
    id: number;
    name: string;
    image: string;
}

interface Pokemon {
    id: number;
    name: string;
    image: string;
}

export default function Show() {
    const route = useRoute();
    const params = route.params;
    const pokemonId = params && typeof params === 'object' && 'pokemonId' in params && typeof params.pokemonId === 'number' ? params.pokemonId : null;
    const {addItemToAsyncStorage, clearAllData} = useAsyncStorage();

    const navigation = useNavigation();

    const handlePress = (evolutionId: number) => {
        navigation.navigate('Show', {pokemonId: evolutionId});
    };

    if (!pokemonId) {
        return (
            <View style={styles.container}>
                <Text>Error: Pokemon ID not found</Text>
            </View>
        );
    }

    const {pokemon, loading} = useGetPokemon(pokemonId);
    const [evolution, setEvolution] = useState<Evolution | null>(null);
    const [preEvolution, setPreEvolution] = useState<PreEvolution | null>(null);

    useEffect(() => {
        const fetchPokemonEvolutions = async () => {
            if (pokemon && pokemon.apiEvolutions && pokemon.apiEvolutions.length > 0) {
                const evolutionData = await useGetOnePokemonEvolutions(pokemon.apiEvolutions[0].pokedexId);
                setEvolution(evolutionData);
            } else {
                setEvolution(null);
            }
        };

        fetchPokemonEvolutions();
    }, [pokemon]);

    useEffect(() => {
        const fetchPokemonPreEvolution = async () => {
            if (typeof pokemon?.apiPreEvolution === 'object' && pokemon.apiPreEvolution !== null) {
                const preEvolutionData = await useGetOnePokemonPreEvolutions(pokemon.apiPreEvolution.pokedexIdd);
                setPreEvolution(preEvolutionData);
            } else {
                setPreEvolution(null);
            }
        };

        fetchPokemonPreEvolution();
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
                <Text>Error: Failed to fetch Pokemon data</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.textApi}>
                <Text style={styles.name}>{pokemon.name}</Text>
                <View style={styles.cardTypes}>
                    {pokemon.apiTypes.map((type, index) => (
                        <Image key={index} style={styles.typeImage} source={{uri: type.image}}/>
                    ))}
                </View>
            </View>
            <Button title={'Add on team'} onPress={() => addItemToAsyncStorage(pokemonId)}/>
            <Button title={'Clear all data'} onPress={clearAllData}/>
            {pokemon.apiEvolutions.length > 0 && (
                <Button title={'Go to Team'} onPress={() => navigation.navigate('Evolution', { pokemonId: pokemonId })} />
            )}
            <View style={styles.container}>
                <View style={styles.pokemonsList}>
                    <View style={styles.mainPokemon}>
                        <Image style={styles.image} source={{uri: pokemon.image}}/>
                    </View>
                    <View style={styles.pokemonEvoContainer}>
                        {preEvolution && (
                            <TouchableOpacity onPress={() => handlePress(preEvolution.id)}>
                                <View style={styles.evolutionContainer}>
                                    <Image style={styles.evolutionImage} source={{uri: preEvolution.image}}/>
                                </View>
                            </TouchableOpacity>
                        )}
                        {evolution && (
                            <TouchableOpacity onPress={() => handlePress(evolution.id)}>
                                <View style={styles.evolutionContainer}>
                                    <Image style={styles.evolutionImage} source={{uri: evolution.image}}/>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.statContainer}>
                    <Text style={styles.stat}>id: {pokemon.id}</Text>
                    <Text style={styles.stat}>HP: {pokemon.stats.HP}</Text>
                    <Text style={styles.stat}>Attack: {pokemon.stats.attack}</Text>
                    <Text style={styles.stat}>Defense: {pokemon.stats.defense}</Text>
                    <Text style={styles.stat}>Special Attack: {pokemon.stats.special_attack}</Text>
                    <Text style={styles.stat}>Special Defense: {pokemon.stats.special_defense}</Text>
                    <Text style={styles.stat}>Speed: {pokemon.stats.speed}</Text>
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textApi: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    evolutionContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    evolutionImage: {
        width: 100,
        height: 100,
    },
    pokemonsList: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 30,
    },
    mainPokemon: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pokemonEvoContainer: {
        width: '40%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    cardTypes: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    typeImage: {
        width: 30,
        height: 30,
    },
    statContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stat: {
        fontSize: 30,
        margin: 5,
        fontWeight: 'bold',
    },
});
