import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import useGetOnePokemon from "../../services/getOnePokemon/useGetOnePokemon";

interface Pokemon {
    name: string;
    image: string;
    // Ajoutez d'autres propriétés de détails du Pokémon si nécessaire
}

interface RouteParams {
    pokemonId: number;
}

interface Props {
    route: RouteProp<{ params: RouteParams }, 'params'>;
}

export default function Show({ route }: Props) {

    const { pokemonId }: RouteParams = route.params;

    const { pokemon }: { pokemon: Pokemon | null } = useGetOnePokemon(pokemonId);

    console.log(pokemonId);
    console.log('Détails du Pokémon :', pokemon);

    return (
        <View style={styles.container}>
            <Text>{pokemon?.name}</Text>
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
});
