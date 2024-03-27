import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const useGetAsyncStoragePokemons = () => {
    const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);
    const [capturedPokemonArray, setCapturedPokemonArray] = useState<number[]>([]);

    useEffect(() => {
        const fetchCapturedPokemons = async () => {
            const capturedPokemons = await AsyncStorage.getItem('capturedPokemon');
            if (capturedPokemons) {
                setCapturedPokemonArray(JSON.parse(capturedPokemons));
            }
        };

        fetchCapturedPokemons();
    }, []);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            if (capturedPokemonArray.length > 0) {
                const details = await Promise.all(
                    capturedPokemonArray.map(async (pokemonId) => {
                        try {
                            const response = await axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonId}`);
                            return response.data;
                        } catch (error) {
                            console.log(error);
                            return null;
                        }
                    })
                );
                setPokemonDetails(details.filter(Boolean));
            }
        };

        fetchPokemonDetails();
    }, [capturedPokemonArray]);

    return { pokemonDetails};
};

export default useGetAsyncStoragePokemons;