import {View, Text, Button} from "react-native";
import React, {useEffect, useState} from "react";
import {NavigationProp} from "@react-navigation/core";
import {FIREBASE_AUTH, DB} from "../../FirebaseConfig";
import {doc, getDoc} from "firebase/firestore"




interface RouterProps{
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserData = async  () =>{
        FIREBASE_AUTH.onAuthStateChanged(async(user) =>{
            console.log(user)
            const docRef = doc(DB, "Users", user!.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setUserDetails(docSnap.data());
                console.log(docSnap);
            }else {
                console.log("User is not logged in");
            }
        });
    }
    useEffect(()=>{
        fetchUserData()

    },[])




    async function handleLogout(){
        try {
            await FIREBASE_AUTH.signOut()
            alert("Logged out successfully!")
        } catch (error: any){
            console.log(error.message)
        }
    }


    return (
        <View>
            {userDetails ? (
                <>
                    <Button onPress={() => navigation.navigate('Details')} title={"Open " + userDetails.firstname +"'s" + " details"}/>
                    <Button onPress={() => handleLogout()} title={"Logout"}/>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

export default List