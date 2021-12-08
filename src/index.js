import './style.css';
import './initial-html.js';
import {makeProjectCards, updateAutoListItemCount} from './dynamic-html';
import {projectHandler} from './factory-functions.js';

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

projectHandler.createNewProject('Project 1');
projectHandler.createNewProject('Project 2');
projectHandler.createNewProject('Project 3');
let project1 = projectHandler.getProject(0);
let project2 = projectHandler.getProject(1);
let date1 = new Date(2021, 11, 12);
project1.addTask('Task1', 'Desc1', date1, 1);
project1.addTask('Task2', 'Take care of the task. Take care of the task. Take care of the task.', null, 2);
project2.addTask('Task1', 'task1task1', new Date(), 0);

//let rawDate = '2/8/91';
//let cookedDate = parse(rawDate, 'MM/dd/yy', new Date());
//console.log(cookedDate);

makeProjectCards();
updateAutoListItemCount();