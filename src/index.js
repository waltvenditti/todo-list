import './style.css';
import './initial-html.js';
import {makeProjectCards, clearProjectCards} from './dynamic-html';
import {projectHandler, } from './factory-functions.js';
import {saveProjectsToLocalStorage, getProjectsFromLocalStorage, createArraysForEachTask, clearProjects, reconstituteProjectArray, restoreDefaultProjects} from './dynamic-html';
const {format, addDays, isBefore, isAfter, isDate, isValid, parse} = require('date-fns');

/*
const today = format(new Date(),'MM.dd.yyyy');
console.log(today);

const date = new Date();
console.log(date);
console.log(`${format(date, 'dd.MM.yyyy')}`);

let date2 = addDays(date, 7);
console.log(date2); 

let date3 = new Date('1991, 2, 10');
console.log(date3); 

let validDate = new Date('2020, 09, 21');
let invalidDate = new Date('2020, 02, 30');
invalidDate = parse(invalidDate, 'dd.MM.yyyy', new Date());
console.log(isValid(validDate));
console.log(isValid(invalidDate));

let date4 = new Date ('1991, 02, 15');
let date5 = addDays(date3, 7);
console.log(isAfter(date4, date3));
console.log(isBefore(date4, date5));

let date6 = 'bad date format';
console.log(isDate(date6));
*/

if (localStorage.length == 0) restoreDefaultProjects();
reconstituteProjectArray();
makeProjectCards();


