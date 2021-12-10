

export const taskFactory = function(initTitle, initDesc, initDueDate, initPriority) {
    let title = initTitle;
    let desc = initDesc;
    let dueDate = initDueDate;
    let priority = initPriority;
    let doneStatus = false; 

    if (title.includes('_')) {
        let titleArray = title.split('_');
        let newTitle = '';
        for (let i = 0; i < titleArray.length; i++) {
            if (i != 0) newTitle += ' ';
            newTitle += `${titleArray[i]}`;
        }
        title = newTitle;
    }

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
       if (newTitle.includes('_')) {
            let titleArray = newTitle.split('_');
            let newTitle2 = '';
            for (let i = 0; i < titleArray.length; i++) {
                newTitle2 += `${titleArray[i]} `;
            }
            title = newTitle2;
        } else title = newTitle;
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


export const projectFactory = function(initName) {
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

    //dates are stored either as Date objects or as null (if there is no due date)
    const addTask = function(title, desc, dueDate, priority) {
        let newTask = taskFactory(title, desc, dueDate, priority);
        taskArray.push(newTask);
    }

    const removeTask = function(index) {
        taskArray.splice(index, 1);
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
    
    return {getProjName, changeProjName, addTask, removeTask, getTaskCount, getTaskTitle, getTaskDesc, getTaskDueDate, getTaskPriority, getTaskDoneStatus, changeTaskTitle, changeTaskDesc, changeTaskDueDate, changeTaskPriority, changeTaskDoneStatus};
}


export const projectHandler = (function() {
    const projectArray = [];

    const createNewProject = function(projectName) {
        let newProject = projectFactory(projectName);
        projectArray.push(newProject);
        return newProject;
    }

    const getProject = function(index) {
        return projectArray[index];
    }

    const removeProject = function(index) {
        projectArray.splice(index, 1);
    }

    const getProjectCount = function() {
        return projectArray.length; 
    }

    return {createNewProject, getProject, removeProject, getProjectCount};
})();


export function saveProjectsToLocalStorage() {
    let projCount = projectHandler.getProjectCount();
    for (let i = 0; i < projCount; i++) {
        let projObj = projectHandler.getProject(i);
        let projectID = `pid${i}`;
        let projTasksArray = [];
        let taskCount = projObj.getTaskCount();
        for (let j = 0; j < taskCount; j++) {
            let taskTitle = projObj.getTaskTitle(j);
            let taskDesc = projObj.getTaskDesc(j);
            let taskDueDate = projObj.getTaskDueDate(j);
            if (taskDueDate == null) taskDueDate ='NULL';
            let taskPriority = projObj.getTaskPriority(j);
            let taskDoneStatus = projObj.getTaskDoneStatus(j);

            let currTaskArray = [
                'NEW$TASK$',
                `${taskTitle}$DIV$`,
                `${taskDesc}$DIV$`,
                `${taskDueDate}$DIV$`,
                `${taskPriority}$DIV$`,
                `${taskDoneStatus}$DIV$`
            ]

            projTasksArray.push(currTaskArray);
        }
        localStorage.setItem(projectID, projTasksArray);
    }
}


export function getProjectsFromLocalStorage() {
    let projCount = localStorage.length;
    let projects = [];
    for (let i = 0; i < projCount; i++) {
        let projectID = `pid${i}`;
        let indivProjString = localStorage.getItem(projectID);
        let projArray = indivProjString.split('NEW$TASK$');
        projArray[0] = projectID;
        projects.push(projArray);
    }
    return projects;
}

export function createArraysForEachTask(projectsArray) {
    let projCount = projectsArray.length;
    for (let i = 0; i < projCount; i++) {
        let project = projectsArray[i];
        if (project.length == 1) continue;
        //true task count is taskCount-1, since the first element is the project ID
        let taskCount = project.length;
        for (let j = 1; j < taskCount; j++) {
            project[j] = project[j].split('$DIV$')
            //below removes a blank element after string split
            project[j].pop();  
            //below loop removes commas on each task ele
            for (let k = 0; k < project[j].length; k++) {
                project[j][k] = project[j][k].slice(1);
            }
            //converts date string to Date() obj
            project[j][2] = new Date(project[j][2]);
        }
        
    }
    return projectsArray;
}

export function clearProjects() {
    while (projectHandler.getProjectCount() != 0) {
        projectHandler.removeProject(0);
    }
}