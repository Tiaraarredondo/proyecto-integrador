import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
const Stack = createNativeStackNavigator();

function StackNavigation() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Register" component={Register} options={
                { headerShown: false}
            } />
        </Stack.Navigator>
    )
}

export default StackNavigation