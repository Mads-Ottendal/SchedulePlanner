
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Button,
    KeyboardAvoidingView, Text
} from "react-native";
import { TextInput } from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {
    signInWithEmailAndPassword,
} from "@firebase/auth";
import {FIREBASE_AUTH, DB} from "../../FirebaseConfig";
import {setDoc, doc } from "firebase/firestore"
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from 'expo-linear-gradient';
import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

export const shadedGray = "#7d7e7f"

const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH;
    const db = DB


    const signIn = async (e) =>{
        e.preventDefault()
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            console.log(response);
        }catch (error: any){
            console.log(error)
            alert("Sign in failed " + error.message)
        }
        finally {
            setLoading(false)
        }
    }




    return (
        <SafeAreaView style={darkMode.container}>
            <KeyboardAvoidingView behavior={"padding"} style={{height:"100%"}}>
                <View style={darkMode.inputContainer}>
                    <Text style={darkMode.signIn}>Sign in</Text>
                    <Text style={darkMode.infoText}>Email</Text>
                    <TextInput value={email} style={darkMode.input} placeholder={"Email"} autoCapitalize={"none"} placeholderTextColor={shadedGray} onChangeText={(text) => setEmail(text)} textColor={shadedGray} selectionColor={"rebeccapurple"} underlineStyle={{display:"none"}}></TextInput>
                    <Text style={darkMode.infoText}>Password</Text>
                    <TextInput secureTextEntry={true} value={password} style={darkMode.input} placeholder={"Password"} autoCapitalize={"none"} placeholderTextColor={shadedGray} onChangeText={(text) => setPassword(text)} right={<TextInput.Icon icon="eye"/>} textColor={shadedGray} selectionColor={"rebeccapurple"} underlineStyle={{display:"none"}}></TextInput>
                    {loading ? <ActivityIndicator size={"large"} color={"#0000ff"}/>
                        : <>
                            <LinearGradient
                                start={[0,1]}
                                end={[1,0]}
                            colors={["#65379B","#886AEA","#6457C6"]} style={darkMode.input}>
                            <Button color={"#fefefe"} title={"Sign in"} onPress={signIn}/>
                            </LinearGradient>
                            <Button title={"Create account"}/>
                        </>}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Login

const darkMode = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        backgroundColor: "#0e1317"
    },
    signIn:{
        color:"#fefefe",
        fontSize: normalize(20),
        fontWeight:"bold",
        verticalAlign:"top",
        paddingTop:normalize(35),
        paddingBottom:normalize(25),

    },
    inputContainer:{
        paddingLeft:normalize(10),
        paddingRight:normalize(10)
    },
    infoText:{
        color:"#fefefe",
        fontSize: normalize(12),
        marginBottom:normalize(4),
    },
    input:{
        justifyContent:"center",
        alignSelf:"center",
        marginBottom:normalize(10),
        width:"100%",
        height:normalize(40),
        borderWidth:1,
        borderColor:shadedGray,
        borderRadius:13,
        borderTopLeftRadius:13,
        borderTopRightRadius:13,
        paddingLeft:normalize(5),
        backgroundColor:"#0e1317",
        marginTop:normalize(3),

    },
})
