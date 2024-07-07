import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import {
    CalendarProvider,
    ExpandableCalendar,
    Timeline,
    TimelineEventProps,
    TimelineList,
    TimelineProps
} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import {CalendarUtils} from "react-native-calendars/src";
import groupBy from "lodash";
import find from "lodash";
import filter from "lodash";
import {timelineEvents} from "../../mocks/timelineEvents";
import {SafeAreaView} from "react-native-safe-area-context";

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





    const onDateChanged = (date: string, source: string) => {
        console.log('TimelineCalendarScreen onDateChanged: ', date, source);
        this.setState({currentDate: date});
    };

    const onMonthChange = (month: any, updateSource: any) => {
        console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
    };

    const timelineProps: Partial<TimelineProps> = {
        format24h: true,
        onBackgroundLongPress: this.createNewEvent,
        onBackgroundLongPressOut: this.approveNewEvent,
        scrollToFirst: true,
        start: 0,
        end: 24,
        unavailableHours: [{start: 0, end: 6}, {start: 22, end: 24}],
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
            // numberOfDays={3}
        >
            <ExpandableCalendar
                firstDay={1}
                leftArrowImageSource={require('/Users/madsottendal/SchedulePlanner/img/previous.png')}
                rightArrowImageSource={require('/Users/madsottendal/SchedulePlanner/img/next.png')}
                markedDates={this.marked}
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