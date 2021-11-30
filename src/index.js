import './style.css';
//import {something} from 'date-fns';

//create basic html elements and display them 

//a task is an object with properties title, desc, due date, priority. Contains methods in the form of functions for modifying these properties? 

//a project is an array of task objects. It may have methods associated with it

//there should be an array of projects. 

//startup:
    // get array from storage
    // if none, or if empty, create default project 
    // otherwise, populate page with existing projects 

//a factory function for making new tasks

const todoActionFactory = (title, desc, dueDate, priority) => {
    
    return {title, desc, dueDate, priority}
};