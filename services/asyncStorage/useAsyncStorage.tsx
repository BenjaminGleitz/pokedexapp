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
            console.log('Captured Pokemon:', capturedPokemon)
        } catch (error) {
            console.error(error);
        }
    };

    const addItemToAsyncStorage = async (pokemonId: number) => {
        try {
            const updatedCapturedPokemon = [...capturedPokemon, pokemonId.toString()];
            await AsyncStorage.setItem('capturedPokemon', JSON.stringify(updatedCapturedPokemon));
            setCapturedPokemon(updatedCapturedPokemon);
            getCapturedPokemon();
            console.log('Pokemon captured!')
        } catch (error) {
            console.error(error);
        }
    };

    const removeItemFromAsyncStorage = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
            getCapturedPokemon();
        } catch (error) {
            console.error(error);
        }
    };

    // clear all data from async storage
    const clearAllData = async () => {
        try {
            await AsyncStorage.clear();
            getCapturedPokemon();
        } catch (error) {
            console.error(error);
        }
    };

    return { capturedPokemon, getCapturedPokemon, addItemToAsyncStorage, removeItemFromAsyncStorage, clearAllData };
}
