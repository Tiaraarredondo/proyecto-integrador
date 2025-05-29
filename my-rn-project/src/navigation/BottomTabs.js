import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import Home from '../Screens/Home'

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home' component={Home} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="signing" size={24} color="black" />
                }}
            />
        </Tab.Navigator>
    )
}
