import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Pokemon {
    name: string;
    image: string;
    apiTypes: {
        image: string;
    }[];
}

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
    return (
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
