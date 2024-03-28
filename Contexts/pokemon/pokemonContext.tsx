import React, { createContext, useContext, useState } from 'react';
interface Pokemon {
    id: number;
    name: string;
    image: string;
}
interface PokemonContextType {
    pokemon: Pokemon | null;
    setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}

const PokemonContext = createContext<PokemonContextType | null>(null);

const PokemonProvider: React.FC = ( children ) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    return (
        <PokemonContext.Provider value={{ pokemon, setPokemon }}>
            children
        </PokemonContext.Provider>
    );
};
