import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import PokemonCard from '../../components/PokemonCard/pokemonCard';
import { useNavigation } from '@react-navigation/native';
import useGetAsyncStoragePokemons from "../../services/asyncStorage/useGetAsyncStoragePokemons";

export default function Search() {
    const { pokemonDetails } = useGetAsyncStoragePokemons();

    const navigation = useNavigation();

    return (
        <ScrollView>
            <View>
                <Button title={"commande vocal"} onPress={() => console.log("commande vocal")}/>
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
});
