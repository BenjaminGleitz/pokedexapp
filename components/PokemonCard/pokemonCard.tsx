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

    const handlePress = () => {
        navigation.navigate('Show', { pokemonId: pokemon.id });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.card}>
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
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 3,
        width: '100%',
        justifyContent: 'space-around',
        backgroundColor: '#FFC562',
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    cardImage: {
        alignItems: 'center',
    },
    pokemonImage: {
        width: 130,
        height: 130,
    },
    cardName: {
        justifyContent: 'space-around',
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    cardTypes: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    typeImage: {
        width: 50,
        height: 50,
    }
});

export default PokemonCard;
