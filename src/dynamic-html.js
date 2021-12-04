import {projectHandler} from './factory-functions.js';
const {format} = require('date-fns');

export function makeProjectCards() {
    let projCount = projectHandler.getProjectCount();
    let projContainer = document.querySelector('.project-container-div');
    for (let i = 0; i < projCount; i++) {
        let projObj = projectHandler.getProject(i);

        let divProj = document.createElement('div');
        let divHeader = document.createElement('div');
        let divBtns = document.createElement('div');
        let divProp = document.createElement('div');
        let divProp2 = document.createElement('div');

        let pProjTitle = document.createElement('p');
        let pTaskCount = document.createElement('p');
        let pProjName = document.createElement('p');

        let inputProjName = document.createElement('input');

        let btnProperties = document.createElement('button');let btnAddTask = document.createElement('button');
        let btnExpand = document.createElement('button');
        let btnClosProp = document.createElement('button');
        let btnNewName = document.createElement('button');
        let btnDelProj = document.createElement('button');


        divProj.setAttribute('id', `pid${i}`);
        inputProjName.setAttribute('placeholder', `${projObj.getProjName()}`);

        divProj.classList.add('project-div');
        divProj.classList.add('project-card');
        divHeader.classList.add('project-card-space-btwn');
        divBtns.classList.add('project-card-space-btwn');
        divProp2.classList.add('project-card-space-btwn');

        btnClosProp.style['display'] = 'none';
        divProp.style['display'] = 'none';
        divProp2.style['display'] = 'none';
        inputProjName.style['width'] = '124px';

        pProjTitle.textContent = projObj.getProjName();
        pTaskCount.textContent = `${projObj.getTaskCount()} tasks`;
        btnProperties.textContent = 'Properties';
        btnAddTask.textContent = 'New Task';
        btnExpand.textContent = 'Expand Tasks';
        btnClosProp.textContent = 'Close Properties';
        pProjName.textContent = 'Project Name:';
        btnNewName.textContent = 'Submit New Name';
        btnDelProj.textContent = 'Delete Project';


        btnProperties.addEventListener('click', () => {
            btnProperties.style['display'] = 'none';
            btnClosProp.style['display'] = 'inline';
            divProp.style['display'] = 'flex';
            divProp2.style['display'] = 'flex';
        });

        btnClosProp.addEventListener('click', () => {
            btnProperties.style['display'] = 'inline';
            btnClosProp.style['display'] = 'none';
            inputProjName.value = '';
            divProp.style['display'] = 'none';
            divProp2.style['display'] = 'none';
        });

        btnDelProj.addEventListener('click', () => {
            projContainer.removeChild(divProj);
            projectHandler.removeProject(i);
            redoProjectIDs();
        });

        btnNewName.addEventListener('click', () => {
            let newName = inputProjName.value;
            projObj = projectHandler.getProject(i);
            projObj.changeProjName(newName);
            pProjTitle.textContent = newName;
            inputProjName.value = '';
        });

        btnExpand.addEventListener('click', () => {
            let taskCount = projObj.getTaskCount();
            let divTask = document.createElement('div');

            divTask.classList.add('task-div');

            divProj.appendChild(divTask);

            for (let j = 0; j < taskCount; j++) {
                let divTaskInd = document.createElement('div');
                let btnDone = document.createElement('button');
                let pTaskTitle = document.createElement('p');
                let pDueDate = document.createElement('p');
                let pPriority = document.createElement('p');
                let btnExpand = document.createElement('button');
                
                divTaskInd.classList.add('indiv-task-div');
                btnDone.classList.add('check-button');

                pTaskTitle.textContent = projObj.getTaskTitle(j);
                let date = format(projObj.getTaskDueDate(j), 'dd MMM yyyy');
                pDueDate.textContent = date;
                pPriority.textContent = projObj.getTaskPriority(j);
                btnExpand.textContent = 'Expand Task';

                //priority logic

                divTask.appendChild(divTaskInd);
                divTaskInd.appendChild(btnDone);
                divTaskInd.appendChild(pTaskTitle);
                divTaskInd.appendChild(pDueDate);
                divTaskInd.appendChild(pPriority);

                //add collapse button, hide expand one 
            }

        });


        projContainer.appendChild(divProj);
        divProj.appendChild(divHeader);
        divHeader.appendChild(pProjTitle);
        divHeader.appendChild(btnProperties);
        divHeader.appendChild(btnClosProp);
        divProj.appendChild(divProp);
        divProj.appendChild(divProp2);
        divProp.appendChild(pProjName);
        divProp.appendChild(inputProjName);
        divProp2.appendChild(btnNewName);
        divProp2.appendChild(btnDelProj);
        divProj.appendChild(pTaskCount);
        divProj.appendChild(divBtns);
        divBtns.appendChild(btnAddTask);
        divBtns.appendChild(btnExpand);
    }
}


export function clearProjectCards() {
    let projContainer = document.querySelector('.project-container-div');
    let prevProjCount = projectHandler.getProjectCount() - 1;
    for (let i = 0; i < prevProjCount; i++) {
        let projCard = document.querySelector(`#pid${i}`);
        projContainer.removeChild(projCard);
    }
}


function redoProjectIDs() {
    let projCards = document.querySelectorAll('.project-div');
    for (let i = 0; i < projCards.length; i++) {
        projCards[i].removeAttribute('id');
        projCards[i].setAttribute('id', `pid${i}`);
    }
}