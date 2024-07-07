import {Appearance, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useEffect, useState} from "react";
import {browserLocalPersistence, onAuthStateChanged, setPersistence, User} from "@firebase/auth";
import {FIREBASE_AUTH} from "./FirebaseConfig";
import List from "./app/screens/List";
import Details from "./app/screens/Details";
import Login from "./app/screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreateAccount from "./app/screens/CreateAccount";
import {Button} from "react-native-paper";
import {Calendar} from "./app/screens/Calendar";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();









function InsideLayout(){
    const [colorScheme, setColorScheme] = React.useState(
        Appearance.getColorScheme(),
    );

    useEffect(() => {
        Appearance.addChangeListener(({colorScheme}) => setColorScheme(colorScheme));
        console.log(colorScheme)
    }, []);

    const isDarkmode = colorScheme === 'dark';

    return(
        <InsideStack.Navigator>
            <InsideStack.Screen name={"Calendar"} component={Calendar} options={{headerRight: () => (
                    <TouchableOpacity>
                        <Button icon={"plus"} textColor={isDarkmode ? "#886AEA" : "#27AAFF"}/>
                    </TouchableOpacity>
                ), headerTitle:"", headerStyle:{backgroundColor:"#010108"}}}/>
            <InsideStack.Screen name={"Details"} component={Details}/>
        </InsideStack.Navigator>
    );
}

export default function App(){
    const [user, setUser] = useState<User | null>(null)


    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log("user", user)
            setUser(user)
        });
    },[]);

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                {user ? (
                    <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}/>
                ):(
                    <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                )}
                <Stack.Screen name={"CreateAccount"} component={CreateAccount} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const darkMode = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#010108",
        alignItems:"center",
        justifyContent:"center"
    }
});

