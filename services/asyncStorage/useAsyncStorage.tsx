import React, { useState, useEffect } from 'react';
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

    const addItemToAsyncStorage = async (pokemonId: number) => {
        try {
            const updatedCapturedPokemon = [...capturedPokemon, pokemonId.toString()];
            await AsyncStorage.setItem('capturedPokemon', JSON.stringify(updatedCapturedPokemon));
            setCapturedPokemon(updatedCapturedPokemon);
            console.log('Pokemon captured:', pokemonId)
            console.log('Captured Pokemon:', updatedCapturedPokemon)
        } catch (error) {
            console.error(error);
        }
    };

    const removeItemFromAsyncStorage = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
            getCapturedPokemon(); // Mettre à jour l'état local après la suppression
        } catch (error) {
            console.error(error);
        }
    };

    // Clear all data from async storage
    const clearAllData = async () => {
        try {
            await AsyncStorage.clear();
            setCapturedPokemon([]); // Mettre à jour l'état local après la suppression
            console.log('All data cleared', capturedPokemon);
        } catch (error) {
            console.error(error);
        }
    };

    return { capturedPokemon, addItemToAsyncStorage, removeItemFromAsyncStorage, clearAllData };
}
