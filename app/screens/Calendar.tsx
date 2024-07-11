import dayjs from 'dayjs';
import * as React from 'react';
import {StyleSheet, View, Text, Dimensions, Appearance, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import {useEffect, useState} from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import FAB from 'react-native-fab';
import Schedule from "f-react-native-schedule";
import {ScheduleView} from "f-react-native-schedule/lib/typescript/types";
import ToggleSwitch from "rn-toggle-switch";
import {Icon} from "@rneui/themed";
import {normalize} from "./Login";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const dates = [
    dayjs().subtract(1, 'hour'),
    dayjs().add(1, 'day').add(1, 'hour'),
    dayjs().add(2, 'day').subtract(2, 'hour'),
    dayjs().add(4, 'day').subtract(6, 'hour'),
];

const schedules = dates.map((date) => ({
    id: date.day(),
    subject: `scheduling ${date.day()}`,
    start_time: date.format('YYYY-MM-DD HH:mm:ss'),
    end_time: date.add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
}));

const typeOfViewOptions: RadioButtonProps[] = [
    {
        id: '1',
        label: 'Day',
        value: 'day',
    },
    {
        id: '2',
        label: 'Week',
        value: 'week',
        selected: true,
    },
];


export default function Calendar() {
    const [colorScheme, setColorScheme] = React.useState(
        Appearance.getColorScheme(),
    );

    useEffect(() => {
        Appearance.addChangeListener(({colorScheme}) => setColorScheme(colorScheme));
        console.log(colorScheme)
    }, []);

    const isDarkmode = colorScheme === 'dark';


    return (
        <View style={{flex:1, backgroundColor: isDarkmode ? "#0e1317" : "#fefefe", paddingTop:normalize(30)}}>
            <View style={{flex:0.1, backgroundColor: isDarkmode ? "#0e1317" : "#fefefe", flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginLeft:20, marginRight:10}}>
                <ToggleSwitch
                    text={{on:"week", off:"day"}}
                    textStyle={{fontWeight: 'bold'}}
                    color={{ indicator: 'white', active: 'rgba(32, 193, 173, 1)', inactive:  'rgba( 247, 247, 247, 1)', activeBorder: '#41B4A4', inactiveBorder: '#E9E9E9'}}
                    active={true}
                    disabled={false}
                    width={35}
                    radius={10}
                    onValueChange={() =>{

                    }}
                />
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
            </View>
            <Schedule
                style={{height:windowHeight}}
                currentView={"week"}
                startHour={"00:00"}
                cellDimensions={{width:(windowWidth-80)/7}}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Calendar;