import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Home from './src/Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}
