import { getByDay, getByMonth } from './prayertiming';
import { prayersCalc, dayCalc } from 'prayer-timetable-lib';
import { useState } from 'react';

const date = new Date();
const year = date.getUTCFullYear();

const timezoneData = {
	"OSLO": [59.9167, 10.75],
	"BERGEN": [60.3913, 5.3221],
  "KRISTIANSAND": [58.1599, 8.0182],
  "STAVANGER": [58.9700, 5.7331],
  "TRONDHEIM": [63.4305, 10.3951]
};

const getDay = (city) => {
  const longAndLat = timezoneData[city];
  return (
    getByDay({
      long: longAndLat[1],
      lat: longAndLat[0],
      method: 'Jafari',
      timeFormat: '24h',
    })
  );
};

const getMonthdata = (city, month) => {
  const longAndLat = timezoneData[city];
  return (
    getByMonth({
      month: month,
      year: year,
      long: longAndLat[1],
      lat: longAndLat[0],
      method: 'Jafari',
      timeFormat: '24h',
    }) // returns an array of object
  )
}

export {getMonthdata, getDay, timezoneData};