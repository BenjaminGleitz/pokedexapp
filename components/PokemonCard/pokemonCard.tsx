import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
    const navigation = useNavigation();

    const handlePokemonPress = (pokemonId: number) => {
        navigation.navigate('Show', { pokemonId });
    }

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handlePokemonPress(pokemon.id)}
        >
            <View style={styles.cardImage}>
                <Image style={styles.pokemonImage} source={{ uri: pokemon.image }} />
            </View>
            <View style={styles.cardName}>
                <Text style={styles.name}>{pokemon.name}</Text>
                <View style={styles.cardTypes}>
                    {pokemon.apiTypes.map((type, index) => (
                        <Image key={index} style={styles.typeImage} source={{ uri: type.image }} />
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        backgroundColor: '#f5f5f5',
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    cardImage: {
        alignItems: 'center',
    },
    pokemonImage: {
        width: 110,
        height: 110,
    },
    cardName: {
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardTypes: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    typeImage: {
        width: 30,
        height: 30,
    }
});

export default PokemonCard;
