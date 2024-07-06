import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import {FIREBASE_AUTH, DB} from "../../FirebaseConfig";
import {doc, getDoc} from "firebase/firestore";
import firebase from "firebase/compat";
import app = firebase.app;




const Calendar = () =>{
    const [items, setItems] = useState({});



    };

export default Calendar