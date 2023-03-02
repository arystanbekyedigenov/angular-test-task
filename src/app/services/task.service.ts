import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of, Subject  } from 'rxjs';
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private apiUrl = 'http://localhost:5000/tasks'
  // private showAddTask: boolean = false;
  // private subject = new Subject<any>();

  constructor(private http:HttpClient) { }

  // getTasks(): Observable<Task[]>{
  //   return this.http.get<Task[]>(this.apiUrl);
  // }

  // getTasksWithStatus(status): Observable<Task[]>{
  //   const url = `${this.apiUrl}?status=${status}`;
  //   return this.http.get<Task[]>(url);
  // }

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
    // console.log(tasks.filter((task) => task.text.toLowerCase().includes(keyword)));
    // return tasks.filter((task) => task.text.toLowerCase().includes(keyword));
    // console.log(tasks.filter((task) => task.text.toLowerCase().indexOf(keyword.toLowerCase()) !== -1));

    return tasks.filter((task) => task.text.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);

    // let filteredTasks = [];
    // tasks.forEach(task => {
    //   if(task.text.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) filteredTasks.push(task);
    // });

    // return filteredTasks;
  }

  // addTask(task: Task): Observable<Task> {
  //   return this.http.post<Task>(this.apiUrl, task, httpOptions);
  // }

  addTask(task: Task){
    localStorage.setItem(task.id, JSON.stringify(task));
    return JSON.parse(localStorage.getItem(task.id));
  }

  addGroup(group){
    localStorage.setItem(group.groupStatus, JSON.stringify(group));
    return JSON.parse(localStorage.getItem(group.groupStatus));
  }

  // deleteTask(task: Task): Observable<Task> {
  //   const url = `${this.apiUrl}/${task.id}`;
  //   return this.http.delete<Task>(url);
  // }

  deleteTask(task: Task){
    localStorage.removeItem(task.id);
    // return this.getTasksWithStatus(task.status);
  }

  // updateTaskStatus(task: Task): Observable<Task> {
  //   const url = `${this.apiUrl}/${task.id}`;
  //   return this.http.put<Task>(url, task, httpOptions);
  // }

  updateTaskStatus(task: Task) {
    localStorage.setItem(task.id, JSON.stringify(task));
  }

  switchTasksPositions(previousTask: Task, currentTask: Task) {
    [previousTask.id, currentTask.id] = [currentTask.id, previousTask.id];
    localStorage.setItem(previousTask.id, JSON.stringify(previousTask));
    localStorage.setItem(currentTask.id, JSON.stringify(currentTask));
  }
}
