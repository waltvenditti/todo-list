import './style.css';
import './initial-html.js';
import {makeProjectCards, restoreDefaultProjects} from './dynamic-html';
import {reconstituteProjectArray} from './dynamic-html';

if (localStorage.length == 0) restoreDefaultProjects();
reconstituteProjectArray();
makeProjectCards();


