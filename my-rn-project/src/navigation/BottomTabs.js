import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome , Entypo, MaterialIcons} from '@expo/vector-icons'
import Home from '../Screens/Home';
import Perfil from '../Screens/Perfil';
import CrearPost from '../Screens/CrearPost';
const Tab= createBottomTabNavigator();
export default function BottomTabs() {
  return (
    <Tab.Navigator>

        <Tab.Screen 
          name='Home' 
          component={Home}
          options={{
            headerShown:false,
            tabBarIcon: () => <FontAwesome name="home" size={24} color="#8B939C" />
          }}
          />

           <Tab.Screen 
          name='Perfil' 
          component={Perfil}
          options={{
            headerShown:false,
            tabBarIcon: () => <MaterialIcons name="account-circle" size={24} color="#8B939C" />
          }}
          />

          <Tab.Screen 
          name='Crear Post' 
          component={CrearPost}
          options={{
            headerShown:false,
            tabBarIcon: () => <Entypo name="pencil" size={24} color="#8B939C" />
          }}
          />


    </Tab.Navigator>
  )
}