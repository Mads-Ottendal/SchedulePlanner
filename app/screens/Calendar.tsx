import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Alert, StyleSheet, Appearance} from 'react-native';
import {
    CalendarProvider,
    ExpandableCalendar,
    Timeline,
    TimelineEventProps,
    TimelineList,
    TimelineProps
} from 'react-native-calendars';
import {Card, useTheme} from 'react-native-paper';
import {CalendarUtils} from "react-native-calendars/src";
import groupBy from "lodash";
import find from "lodash";
import filter from "lodash";
import {getDate, timelineEvents} from "../../mocks/timelineEvents";
import {SafeAreaView} from "react-native-safe-area-context";
import {backgroundColor} from "react-native-calendars/src/style";

const INITIAL_TIME = {hour: 9, minutes: 0};
const EVENTS: TimelineEventProps[] = timelineEvents;

const dateObj = new Date();
const month   = dateObj.getUTCMonth() + 1; // months from 1-12
const day     = dateObj.getUTCDate();
const year    = dateObj.getUTCFullYear();

const pMonth        = month.toString().padStart(2,"0");
const pDay          = day.toString().padStart(2,"0");

const ptoday = year + "-" + pMonth + "-" + pDay;


export const Calendar = () => {



const [date, setDate] = useState(ptoday)

    function getDate(){
        return date;
    }


    const state = {
        currentDate: getDate(),
        events: EVENTS,
        eventsByDate: groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start)) as {
            [key: string]: TimelineEventProps[];
        }
    };

    const [colorScheme, setColorScheme] = React.useState(

        Appearance.getColorScheme(),
    );

    useEffect(() => {
        Appearance.addChangeListener(({colorScheme}) => setColorScheme(colorScheme));
    }, []);

    const isDarkmode = colorScheme === 'dark';



    const onDateChanged = (date: string, source: string) => {
        console.log('TimelineCalendarScreen onDateChanged: ', date, source);
        setDate(date);
    };

    const onMonthChange = (month: any, updateSource: any) => {
        console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
    };

    const timelineProps: Partial<TimelineProps> = {
        format24h: true,
        scrollToNow:true,
        start: 0,
        end: 24,
        overlapEventsSpacing: 8,
        rightEdgeSpacing: 24,

    };



    return (
        <CalendarProvider
            date={ptoday}
            onDateChanged={onDateChanged}
            onMonthChange={onMonthChange}
            showTodayButton
            disabledOpacity={0.6}
            style={{backfaceVisibility:"hidden"}}

        >
            <ExpandableCalendar
                firstDay={1}
                leftArrowImageSource={require('/Users/madsottendal/SchedulePlanner/img/previous.png')}
                rightArrowImageSource={require('/Users/madsottendal/SchedulePlanner/img/next.png')}
                theme={{
                    calendarBackground: isDarkmode ? "#0e1317" : "#fefefe",
                    selectedDayBackgroundColor: isDarkmode ? "#886AEA" : "#27AAFF",
                    textDayStyle: {color: isDarkmode ? "#fefefe" : "#010101"},
                    arrowColor: isDarkmode ? "#886AEA" : "#27AAFF",
                    monthTextColor: isDarkmode ? "#886AEA" : "#27AAFF",
                    textMonthFontWeight: "500",
                    selectedDayTextColor:isDarkmode ? "#fefefe" : "#010101",
                    textSectionTitleColor:isDarkmode ? "#fefefe" : "#010101",
                    todayTextColor:isDarkmode ? "#fefefe" : "#010101",
                }}


            />
            <TimelineList
                events={EVENTS}
                timelineProps={timelineProps}
                showNowIndicator
                scrollToNow
                scrollToFirst
                initialTime={INITIAL_TIME}
            />

        </CalendarProvider>
    );
}

