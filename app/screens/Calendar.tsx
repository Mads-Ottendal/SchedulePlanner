import dayjs from 'dayjs';
import * as React from 'react';
import {StyleSheet, View, Text, Dimensions, Appearance, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import Schedule from "f-react-native-schedule";
import { FAB } from 'react-native-paper';
import {ScheduleView} from "f-react-native-schedule/lib/typescript/types";
import DateTimePicker from "react-native-modal-datetime-picker";
import {Icon} from "@rneui/themed";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const dates = [
    dayjs().subtract(1, 'hour'),
    dayjs().add(1, 'day').add(1, 'hour'),
    dayjs().add(2, 'day').subtract(2, 'hour'),
    dayjs().add(4, 'day').subtract(6, 'hour'),
];

dates.forEach(d => console.log(d.add(1,'hour').format('YYYY-MM-DD HH:mm:ss')))
const schedules = dates.map((date) => ({
    id: date.day(),
    subject: `Do this`,
    start_time: '2024-07-12 12:30:00',
    end_time: '2024-07-12 14:55:00',
}));

const events = [
    {
        id: 42,
        subject: `Do this`,
        start_time: '2024-07-12 13:25:00',
        end_time: '2024-07-12 13:55:00',

    },
]



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
    const [date, setDate] = useState(new Date());

    const [radioButtons, setRadioButtons] = useState(typeOfViewOptions);
    const [currentView, setCurrentView] = useState<ScheduleView>('week');





    const [colorScheme, setColorScheme] = React.useState(
        Appearance.getColorScheme(),
    );





    useEffect(() => {
        Appearance.addChangeListener(({colorScheme}) => setColorScheme(colorScheme));
        console.log(colorScheme)
    }, []);

    const isDarkmode = colorScheme === 'dark';








    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={{ padding: 8, width: '100%' }}>
                    <Text>Selected Date</Text>
                    <DateTimePicker
                        style={{ width: '100%', marginBottom: 8, height:20, backgroundColor:"green" }}
                        date={date}
                        placeholder="select date"
                        onCancel={() => console.log("cancelled")}
                        onConfirm={setDate}/>

                    <Text>Type of View</Text>
                    <RadioGroup
                        containerStyle={{ marginBottom: 8 }}
                        radioButtons={radioButtons}
                        onPress={() => console.log("nothing")}
                        layout="row"
                    />
                </View>

                <Schedule
                    schedules={schedules}
                    selectedDate={date}
                    currentView={'week'}
                />
                <FAB
                    color={"red"}
                    visible={true}
                    onPress={() => console.log("FAB pressed")}

                >
                    <Icon

                    ></Icon>
                </FAB>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
});

export default Calendar;