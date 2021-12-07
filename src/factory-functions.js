

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