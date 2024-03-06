import { useState, useEffect } from 'react';
import axios from 'axios';

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

const useGetAllPokemons = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPokemons = async () => {
        try {
            const response = await axios.get('https://pokebuildapi.fr/api/v1/pokemon/limit/5');
            setPokemons(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, []);

    return { pokemons };
};

export default useGetAllPokemons;
