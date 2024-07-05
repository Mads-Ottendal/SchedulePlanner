
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Button,
    KeyboardAvoidingView, Text, StatusBar
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
import GradientText from "react-native-gradient-texts";
import {useNavigation} from "@react-navigation/native";
import { Appearance } from 'react-native';




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
export const lightModeGray = "#101009"
const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH;
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const [colorScheme, setColorScheme] = React.useState(

        Appearance.getColorScheme(),
    );

    useEffect(() => {
        Appearance.addChangeListener(({colorScheme}) => setColorScheme(colorScheme));
        console.log(colorScheme)
    }, []);

    const isDarkmode = colorScheme === 'dark';



    const  navigation = useNavigation()

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


    const sparklesEmoji = "\u2728"

    return (
        <SafeAreaView style={isDarkmode ? darkMode.container : lightMode.container}>
            <StatusBar barStyle={isDarkmode ? "light-content" : "dark-content"}/>
            <KeyboardAvoidingView behavior={"padding"} style={{height:"100%"}}>
                <View style={isDarkmode ? darkMode.inputContainer : lightMode.inputContainer}>
                    <GradientText
                        text={"Sign in to your account" + sparklesEmoji}
                        fontSize={normalize(20)}
                        fontWeight={"bold"}
                        width={"100%"}
                        height={"10%"}
                        locations={{x:"41.5%", y:"75%"}}
                        isGradientFill
                        gradientColors={isDarkmode ? ["#886AEA", "#8457C6"] : ["#6478FF", "#27AAFF"]}
                    />
                    {/*<Text style={isDarkmode ? darkMode.signIn : lightMode.signIn}>Sign in to your account{sparklesEmoji}</Text>*/}
                    <Text style={isDarkmode ? darkMode.welcomeText : lightMode.welcomeText}>Welcome back! Please enter your details.</Text>
                    <Text style={isDarkmode ? darkMode.infoText : lightMode.infoText}>Email</Text>
                    <TextInput value={email} style={isDarkmode ? darkMode.input : lightMode.input} placeholder={"Enter your email"} autoCapitalize={"none"} placeholderTextColor={isDarkmode ? shadedGray : lightModeGray} onChangeText={(text) => setEmail(text)} textColor={isDarkmode ? shadedGray : lightModeGray} selectionColor={"rebeccapurple"} underlineStyle={{display:"none"}} left={<TextInput.Icon icon={"email-outline"}/>}></TextInput>
                    <Text style={isDarkmode ? darkMode.infoText : lightMode.infoText}>Password</Text>
                    <TextInput secureTextEntry={secureTextEntry} value={password} style={isDarkmode ? darkMode.input : lightMode.input} placeholder={"Enter your password"} autoCapitalize={"none"} placeholderTextColor={isDarkmode ? shadedGray : lightModeGray} onChangeText={(text) => setPassword(text)} right={<TextInput.Icon onPress={() => setSecureTextEntry(!secureTextEntry)} icon={(secureTextEntry ? "eye-off-outline" : "eye-outline")}/>} left={<TextInput.Icon icon={"lock-outline"}/>} textColor={isDarkmode ? shadedGray : lightModeGray} selectionColor={"rebeccapurple"} underlineStyle={{display:"none"}}></TextInput>
                    {loading ? <ActivityIndicator size={"large"} color={isDarkmode ? "#886AEA" : "#27AAFF"}/>
                        : <>
                            <LinearGradient
                                start={[0,1]}
                                end={[1,0]}
                                colors={isDarkmode ? ["#65379B","#886AEA","#6457C6"] : ["#6478FF", "#27AAFF", "#6878FF"]} style={darkMode.gradientButton}>
                                <Button color={"#fefefe"} title={"Sign in"} onPress={signIn}/>
                            </LinearGradient>
                        </>}
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={isDarkmode ? darkMode.lines : lightMode.lines} />
                        <View>
                            <Text style={isDarkmode ? darkMode.lineText : lightMode.lineText}>Don't have an account yet?</Text>
                        </View>
                        <View style={isDarkmode ? darkMode.lines : lightMode.lines}/>
                    </View>
                    <View style={{borderBottomWidth:1, borderBottomColor: isDarkmode ? "#886AEA" : "#27AAFF", width:"100%", justifyContent:"center", alignContent:"center", paddingTop:normalize(10)}}>
                        <Button title={"Sign up here"} color={isDarkmode ? "#886AEA" : "#27AAFF"} onPress={() => navigation.navigate("CreateAccount")}/>
                    </View>
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
        paddingBottom:normalize(10),

    },
    welcomeText:{
        fontSize:normalize(11),
        color:shadedGray,
        paddingBottom:normalize(15),
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
        backgroundColor:"#0e1317",
        marginTop:normalize(3),

    },
    gradientButton:{
        justifyContent:"center",
        alignSelf:"center",
        marginBottom:normalize(10),
        width:"100%",
        height:normalize(40),
        borderWidth:1,
        borderRadius:13,
        borderTopLeftRadius:13,
        borderTopRightRadius:13,
        paddingLeft:normalize(5),
        backgroundColor:"#0e1317",
        marginTop:normalize(3),
    },
    lines:{
        flex: 1,
        height: 1,
        backgroundColor: shadedGray,
        margin:5,
    },
    lineText:{
        textAlign: 'center',
        color:shadedGray,
    },
    signUp:{
        justifyContent:"center",
        alignSelf:"center",
        marginBottom:normalize(10),
        width:"25%",
        height:normalize(40),
        borderWidth:1,
        borderRadius:13,
        borderTopLeftRadius:13,
        borderTopRightRadius:13,
        paddingLeft:normalize(5),
        backgroundColor:"#0e1317",
        marginTop:normalize(3),
    },
})


const lightMode = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        backgroundColor: "#fefefe"
    },
    signIn:{
        color:"#010101",
        fontSize: normalize(20),
        fontWeight:"bold",
        verticalAlign:"top",
        paddingTop:normalize(35),
        paddingBottom:normalize(10),

    },
    welcomeText:{
        fontSize:normalize(11),
        color:lightModeGray,
        paddingBottom:normalize(15),
    },
    inputContainer:{
        paddingLeft:normalize(10),
        paddingRight:normalize(10)
    },
    infoText:{
        color:"black",
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
        borderColor:"black",
        borderRadius:13,
        borderTopLeftRadius:13,
        borderTopRightRadius:13,
        backgroundColor:"#eeeeee",
        marginTop:normalize(3),

    },
    gradientButton:{
        justifyContent:"center",
        alignSelf:"center",
        marginBottom:normalize(10),
        width:"100%",
        height:normalize(40),
        borderWidth:1,
        borderRadius:13,
        borderTopLeftRadius:13,
        borderTopRightRadius:13,
        paddingLeft:normalize(5),
        backgroundColor:"#0e1317",
        marginTop:normalize(3),
    },
    lines:{
        flex: 1,
        height: 1,
        backgroundColor: lightModeGray,
        margin:5,
    },
    lineText:{
        textAlign: 'center',
        color:lightModeGray,
    },
    signUp:{
        justifyContent:"center",
        alignSelf:"center",
        marginBottom:normalize(10),
        width:"25%",
        height:normalize(40),
        borderWidth:1,
        borderRadius:13,
        borderTopLeftRadius:13,
        borderTopRightRadius:13,
        paddingLeft:normalize(5),
        backgroundColor:"#0e1317",
        marginTop:normalize(3),
    },
})

