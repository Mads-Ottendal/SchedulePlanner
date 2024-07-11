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
import {Button, ButtonGroup, Icon} from "@rneui/themed"
import {CreateTask, Home} from "./app/calendarScreens";
import Calendar from "./app/screens/Calendar";
import ToggleSwitch from 'rn-toggle-switch'

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

const CalendarStack = createNativeStackNavigator();








function CalendarNavigation() {
    const [colorScheme, setColorScheme] = React.useState(
        Appearance.getColorScheme(),
    );

    useEffect(() => {
        Appearance.addChangeListener(({colorScheme}) => setColorScheme(colorScheme));
        console.log(colorScheme)
    }, []);

    const isDarkmode = colorScheme === 'dark';

    return (
        <CalendarStack.Navigator>
            <CalendarStack.Screen component={Home} name={"home"} options={{headerShown:false}}/>
            <CalendarStack.Screen component={CreateTask} name={'CreateTask'} options={{headerShown:false}}/>
        </CalendarStack.Navigator>
    );

}




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

    const [isWeekToggled, setIsWeekToggled] = useState(true)

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Calendar'>
                {user ? (
                    <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}/>
                ):(
                    <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                )}
                <Stack.Screen name={"CreateAccount"} component={CreateAccount} options={{headerShown:false}}/>
                <Stack.Screen name={"Calendar"} component={Calendar} options={{headerShown:false}}/>
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

