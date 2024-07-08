import {Appearance, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useEffect, useState} from "react";
import {browserLocalPersistence, onAuthStateChanged, setPersistence, User} from "@firebase/auth";
import {FIREBASE_AUTH} from "./FirebaseConfig";
import List from "./app/screens/List";
import Details from "./app/screens/Details";
import Login, {normalize} from "./app/screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreateAccount from "./app/screens/CreateAccount";
import {Calendar} from "./app/screens/Calendar";
import {Button, Icon} from "@rneui/themed"

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
                    <TouchableOpacity onPress={() => {
                        alert("Implement create new event")
                    }}>
                        <Icon
                            name={"add-outline"}
                            type={"ionicon"}
                            color={isDarkmode ? "#886AEA" : "#27AAFF"}
                            size={normalize(25)}
                        />
                    </TouchableOpacity>
                ), headerTitle:"", headerStyle:{backgroundColor: isDarkmode ? "#010108" : "#fefefe"}}}/>
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


    const [colorScheme, setColorScheme] = React.useState(
        Appearance.getColorScheme(),
    );

    useEffect(() => {
        Appearance.addChangeListener(({colorScheme}) => setColorScheme(colorScheme));
        console.log(colorScheme)
    }, []);

    const isDarkmode = colorScheme === 'dark';

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Calendar'>
                {user ? (
                    <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}/>
                ):(
                    <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                )}
                <Stack.Screen name={"CreateAccount"} component={CreateAccount} options={{headerShown:false}}/>
                <InsideStack.Screen name={"Calendar"} component={Calendar} options={{headerRight: () => (
                        <TouchableOpacity onPress={() => {
                            alert("Implement create new event")
                        }}>
                            <Icon
                                name={"add-outline"}
                                type={"ionicon"}
                                color={isDarkmode ? "#886AEA" : "#27AAFF"}
                                size={normalize(25)}
                            />
                        </TouchableOpacity>
                    ), headerTitle:"", headerStyle:{backgroundColor: isDarkmode ? "#0e1317" : "#fefefe"}}}/>
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

