import {projectHandler} from './factory-functions.js';

export function makeProjectCards() {
    let projCount = projectHandler.getProjectCount();
    let projContainer = document.querySelector('.project-container-div');
    for (let i = 0; i < projCount; i++) {
        let projObj = projectHandler.getProject(i);

        let divProj = document.createElement('div');
        let divHeader = document.createElement('div');
        let divBtns = document.createElement('div');
        let pProjTitle = document.createElement('p');
        let pTaskCount = document.createElement('p');
        let btnProperties = document.createElement('button');let btnAddTask = document.createElement('button');
        let btnExpand = document.createElement('button');

        divProj.setAttribute('id', `pid${i}`);
        divProj.classList.add('project-div-collapsed');
        divHeader.classList.add('project-card-header');
        divBtns.classList.add('project-card-header');

        pProjTitle.textContent = projObj.getProjName();
        pTaskCount.textContent = `${projObj.getTaskCount()} tasks`;
        btnProperties.textContent = 'Properties';
        btnAddTask.textContent = 'New Task';
        btnExpand.textContent = 'Expand Tasks';

        projContainer.appendChild(divProj);
        divProj.appendChild(divHeader);
        divHeader.appendChild(pProjTitle);
        divHeader.appendChild(btnProperties);
        divProj.appendChild(pTaskCount);
        divProj.appendChild(divBtns);
        divBtns.appendChild(btnAddTask);
        divBtns.appendChild(btnExpand);

        console.log(`run ${i}`);
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