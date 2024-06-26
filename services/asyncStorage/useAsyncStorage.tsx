import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAsyncStorage() {
    const [capturedPokemon, setCapturedPokemon] = useState<string[]>([]);

    useEffect(() => {
        getCapturedPokemon();
    }, []);

    const getCapturedPokemon = async () => {
        try {
            const captured = await AsyncStorage.getItem('capturedPokemon');
            if (captured !== null) {
                setCapturedPokemon(JSON.parse(captured));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addItemToAsyncStorage =useCallback ( async (pokemonId: number) => {
        try {
            const isPokemonCaptured = capturedPokemon.includes(pokemonId.toString());
            let updatedCapturedPokemon: string[];
            if (isPokemonCaptured) {
                updatedCapturedPokemon = capturedPokemon.filter(id => id !== pokemonId.toString());
                console.log('je libère le pokemon' + pokemonId.toString(), updatedCapturedPokemon);
            } else {
                updatedCapturedPokemon = [...capturedPokemon, pokemonId.toString()];
                console.log('je capture le pokemon' + pokemonId.toString(), updatedCapturedPokemon);
            }
            await AsyncStorage.setItem('capturedPokemon', JSON.stringify(updatedCapturedPokemon));
            setCapturedPokemon(updatedCapturedPokemon);
        } catch (error) {
            console.error(error);
        }
    } , [capturedPokemon])

    const clearAllData = async () => {
        if (capturedPokemon.length === 0) {
            console.log('il n\'y a pas de pokemons capturés');
            return;
        }
        try {
            await AsyncStorage.clear();
            setCapturedPokemon([]);
            console.log('je clear tout les pokemons capturés', capturedPokemon);
        } catch (error) {
            console.error(error);
        } finally {
            getCapturedPokemon(); // Mettre à jour l'état local après avoir tout effacé
        }
    };

    const clearOneData = useCallback(async (pokemonId: number) => {
        try {
            const updatedCapturedPokemon = capturedPokemon.filter(id => id !== pokemonId.toString());
            await AsyncStorage.setItem('capturedPokemon', JSON.stringify(updatedCapturedPokemon));
            setCapturedPokemon(updatedCapturedPokemon);
        } catch (error) {
            console.error(error);
        }
        finally {
            getCapturedPokemon();
        }
    }, [capturedPokemon]);

    return { capturedPokemon, addItemToAsyncStorage, clearAllData, clearOneData, getCapturedPokemon };
}