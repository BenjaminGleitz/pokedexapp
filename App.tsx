// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/home/home';
import Show from './pages/show/show';
import Team from "./pages/team/team";
import Evolution from "./pages/evolution/evolution";

export type RootStackParamList = {
    Home: undefined;
    Show: { pokemonId: number };
    Team: undefined;
    Evolution: { pokemonId: number };
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Home">
                <RootStack.Screen name="Home" component={Home} />
                <RootStack.Screen name="Show" component={Show} />
                <RootStack.Screen name="Team" component={Team} />
                <RootStack.Screen name="Evolution" component={Evolution} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
