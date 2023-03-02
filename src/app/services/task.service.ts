import { Injectable } from '@angular/core';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getGroups(){
    let groups = [];
    for (var i = 0; i < localStorage.length; i++){
      let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if(data.isGroup) groups.push(data);
    }
    return groups.sort((a, b) => (a.groupStatus > b.groupStatus) ? 1 : -1);
  }

  getTasksWithStatus(status){
    let tasksWithStatus = [];
    for (var i = 0; i < localStorage.length; i++){
      // console.log(localStorage.key(i));
      let task = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if( task.status == status ) tasksWithStatus.push(task);
    }
    return tasksWithStatus;
  }

  sortTasks(tasks, sortType){
    if(sortType == 'name'){
      for (let i = 1; i < tasks.length; i++) {
        let currentValue = tasks[i];
        let j;
        for (j = i - 1; j >= 0 && tasks[j].text.toLowerCase() > currentValue.text.toLowerCase(); j--) {
          tasks[j + 1] = tasks[j];
        }
        tasks[j + 1] = currentValue;
      }
    } 

    else if(sortType == 'date'){
      for (let i = 1; i < tasks.length; i++) {
        let currentValue = tasks[i];
        let j;
        for (j = i - 1; j >= 0 && tasks[j].createDate > currentValue.createDate; j--) {
          tasks[j + 1] = tasks[j];
        }
        tasks[j + 1] = currentValue;
      }
    } 

    else if(sortType == 'priority'){
      for(var i = 0; i < tasks.length; i++) {
        for(var j=0; j < tasks.length; j++) {
          if(tasks[i].priority > tasks[j].priority) {
            var temp = tasks[i];
            tasks[i] = tasks[j];
            tasks[j] = temp;        
          }
        }
      }
    }
    
    return tasks;
  }

  searchTasks(tasks, keyword){
    return tasks.filter((task) => task.text.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
  }

  addTask(task: Task){
    localStorage.setItem(task.id, JSON.stringify(task));
    return JSON.parse(localStorage.getItem(task.id));
  }

  addGroup(group){
    localStorage.setItem(group.groupStatus, JSON.stringify(group));
    return JSON.parse(localStorage.getItem(group.groupStatus));
  }

  deleteTask(task: Task){
    localStorage.removeItem(task.id);
    // return this.getTasksWithStatus(task.status);
  }

  updateTaskStatus(task: Task) {
    localStorage.setItem(task.id, JSON.stringify(task));
  }

  switchTasksPositions(previousTask: Task, currentTask: Task) {
    [previousTask.id, currentTask.id] = [currentTask.id, previousTask.id];
    localStorage.setItem(previousTask.id, JSON.stringify(previousTask));
    localStorage.setItem(currentTask.id, JSON.stringify(currentTask));
  }
}
