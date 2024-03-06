import { useState, useEffect } from 'react';
import axios from 'axios';

interface Pokemon {
    id: number;
    name: string;
    image: string;
    apiGeneration: number;
    apiTypes: {
        name: string;
        image: string;
    }[];
}

const useGetAllPokemons = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPokemons = async () => {
        try {
            const response = await axios.get('https://pokebuildapi.fr/api/v1/pokemon/limit/20');
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
