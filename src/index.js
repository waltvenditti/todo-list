import './style.css';

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

let date6 = 'retard';
console.log(isDate(date6));
*/




//function that checks date that use entered. runs isValid on the date if a date was given at all. Returns null if no date given. Returns false is something went wrong. 





//create basic html elements and display them 

//a task is an object with properties title, desc, due date, priority. Contains methods in the form of functions for modifying these properties? 

//a project is an array of task objects. It may have methods associated with it

//there should be an array of projects. 

//startup:
    // get array from storage
    // if none, or if empty, create default project 
    // otherwise, populate page with existing projects 

const projectArray = [];


const taskFactory = function(initTitle, initDesc, initDueDate, initPriority) {
    let title = initTitle;
    let desc = initDesc;
    let dueDate = initDueDate;
    let priority = initPriority;
    let doneStatus = false; 

    const getTitle = function() {
        return title;
    }

    const getDesc = function() {
        return desc;
    }

    const getDueDate = function() {
        return dueDate;
    }

    const getPriority = function() {
        return priority;
    }

    const getDoneStatus = function() {
        return doneStatus;
    }
    
    const changeTitle = function(newTitle) {
        title = newTitle;
    } 

    const changeDesc = function(newDesc) {
        desc = newDesc;
    }

    const changeDueDate = function(newDueDate) {
        dueDate = newDueDate;
    }

    const changePriority = function(newPriority) {
        priority = newPriority;
    }

    const changeDoneStatus = function() {
        doneStatus = !doneStatus; 
    }

    return {getTitle, getDesc, getDueDate, getPriority, getDoneStatus, changeTitle, changeDesc, changeDueDate, changePriority, changeDoneStatus};
};


const projectFactory = function(initName) {
    let taskArray = [];
    let projectName = initName;

    const getProjName = function() {
        return projectName;
    }

    const changeProjName = function(newName) {
        projectName = newName;
    }

    const getTaskCount = function() {
        return taskArray.length;
    }

    const addTask = function(title, desc, dueDate, priority) {
        let newTask = taskFactory(title, desc, dueDate, priority);
        taskArray.push(newTask);
    }

    const getTask = function(index) {
        if (checkTaskIndex(index, taskArray.length) == true) {
            return taskArray[index];
        }
    }

    const getTaskTitle = function(index) {
        let task = getTask(index);
        return task.getTitle();
    }

    const getTaskDesc = function(index) {
        let task = getTask(index);
        return task.getDesc();
    }

    const getTaskDueDate = function(index) {
        let task = getTask(index); 
        return task.getDueDate();
    }

    const getTaskPriority = function(index) {
        let task = getTask(index);
        return task.getPriority(); 
    }

    const getTaskDoneStatus = function(index) {
        let task = getTask(index);
        return task.getDoneStatus();
    }

    const changeTaskTitle = function(index, newTitle) {
        let task = getTask(index);
        task.changeTitle(newTitle); 
        return task.getTitle();
    }

    const changeTaskDesc = function(index, newDesc) {
        let task = getTask(index);
        task.changeDesc(newDesc); 
        return task.getDesc(); 
    }

    const changeTaskDueDate = function(index, newDueDate) {
        let task = getTask(index);
        task.changeDueDate(newDueDate);
        return task.getDueDate();
    }

    const changeTaskPriority = function(index, newPriority) {
        let task = getTask(index);
        task.changePriority(newPriority);
        return task.getPriority();
    }

    const changeTaskDoneStatus = function(index) {
        let task = getTask(index);
        task.changeDoneStatus();
        return task.getDoneStatus();
    }

    //this function may not be necessary
    const checkTaskIndex = function(index, arrayLength) {
        if (index < arrayLength && index >= 0) return true;
        else return false; 
    }
    
    return {getProjName, changeProjName, addTask, getTaskCount, getTaskTitle, getTaskDesc, getTaskDueDate, getTaskPriority, getTaskDoneStatus, changeTaskTitle, changeTaskDesc, changeTaskDueDate, changeTaskPriority, changeTaskDoneStatus};
}


function createNewProject(projectName) {
    let newProject = projectFactory(projectName);
    projectArray.push(newProject);
    return newProject;
}

let project1 = createNewProject('Project 1');
project1.addTask('Task1', 'Desc1', '1/1/2001', 1);

console.log(project1);
console.log(project1.getTaskCount());
console.log(project1.getTaskTitle(0));
project1.changeTaskTitle(0, 'Task0');
console.log(project1.getTaskTitle(0));

