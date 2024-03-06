import {useEffect, useState} from 'react';
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

const useGetOnePokemon = (pokemonId: number) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [pokemonEvolution, setPokemonEvolution] = useState<Pokemon | null>(null);
    const [evoliEvolutions, setEvoliEvolutions] = useState<Pokemon[] | null>(null);
    const [pokemonPreEvolution, setPokemonPreEvolution] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonId}`);
                setPokemon(response.data);

                const evolutionId = response.data.apiEvolutions[0]?.pokedexId;
                const evoliEvolutionId = response.data.apiEvolutions.map((evolution: {
                    pokedexId: number
                }) => evolution.pokedexId);
                const preEvolutionId = response.data.apiPreEvolution?.pokedexIdd;


                if (evolutionId) {
                    await fetchPokemonEvolution(evolutionId);
                }

                if (evoliEvolutionId) {
                    await fetchEvoliEvolution(evoliEvolutionId);
                }

                if (preEvolutionId && preEvolutionId !== 'none') {
                    await fetchPokemonPreEvolution(preEvolutionId);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPokemonEvolution = async (evolutionId: number) => {
            try {
                const evolutionResponse = await axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${evolutionId}`);
                setPokemonEvolution(evolutionResponse.data);

            } catch (error) {
                console.log(error);
            }
        };

        const fetchEvoliEvolution = async (evoliEvolutionId: number[]) => {
            try {
                const evolutionResponses = await Promise.all(
                    evoliEvolutionId.map(async (evoliEvolution: number) => {
                        return axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${evoliEvolution}`);
                    })
                );

                const evolutionsData: Pokemon[] = evolutionResponses.map(response => response.data);
                setEvoliEvolutions(evolutionsData);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchPokemonPreEvolution = async (prevEvolutionId: number) => {
            try {
                const pokemonPreEvolution = await axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${prevEvolutionId}`);
                setPokemonPreEvolution(pokemonPreEvolution.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchPokemonDetails();
    }, [pokemonId]);

    return {pokemon, pokemonEvolution, pokemonPreEvolution, loading, evoliEvolutions};
};

export default useGetOnePokemon;
