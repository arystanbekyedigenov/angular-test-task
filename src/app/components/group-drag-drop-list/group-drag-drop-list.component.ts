import { Component, OnInit } from '@angular/core';
// import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { UiService } from '../../services/ui.service';
import { Observable, Subscription } from 'rxjs';
import { Task } from '../../Task';
// import { faTimes, faBell, faPlus, faEllipsisH, faCalendar, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group-drag-drop-list',
  templateUrl: './group-drag-drop-list.component.html',
  styleUrls: ['./group-drag-drop-list.component.css']
})
export class GroupDragDropListComponent implements OnInit {
  todo = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  groups = [];
  groupsInfo = [];
  filter: string = 'name';

  showAddTask: boolean;
  subscription: Subscription;

  constructor(private taskService:TaskService, private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }

  ngOnInit(): void {
    // this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks)

    // this.taskService.getTasksWithStatus('0').subscribe((tasks) => this.todo = tasks)
    // this.taskService.getTasksWithStatus('1').subscribe((tasks) => this.inProgress = tasks)
    // this.taskService.getTasksWithStatus('2').subscribe((tasks) => this.done = tasks)

    // this.taskService.getGroups();
    this.generateGroups();
  }

  generateGroups(){
    // this.todo = this.taskService.getTasksWithStatus('0');

    // this.groups = [
    //   this.taskService.getTasksWithStatus('0'), 
    //   this.taskService.getTasksWithStatus('1'), 
    //   this.taskService.getTasksWithStatus('2')
    // ];

    this.groups = [];
    this.groupsInfo = [];

    this.taskService.getGroups().forEach(group => {
      this.groups.push(this.taskService.getTasksWithStatus(group.groupStatus));
      this.groupsInfo.push(group);
    })
    // console.log(this.groups);
    // console.log(this.groupsInfo);
    // this.groupsInfo.sort((a, b) => (a.groupStatus > b.groupStatus) ? 1 : -1)
  }

  addTask(task: Task){
    // this.taskService.addTask(task).subscribe((task)=>(this.todo.push(task)));
    // this.todo.push(this.taskService.addTask(task));
    this.taskService.addTask(task);
    this.generateGroups();
    // console.log(this.groups);
  }

  addGroup(group){
    // this.taskService.addTask(task).subscribe((task)=>(this.todo.push(task)));
    // this.todo.push(this.taskService.addTask(task));
    this.taskService.addGroup(group);
    this.generateGroups();
    // console.log(this.groups);
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  onDelete(e){
    // this.onDeleteTask.emit(task);
    // console.log(this.todo.filter((t) => t.id !== task.id));
    // if(status == '0') this.taskService.deleteTask(task).subscribe(() => (this.todo = this.todo.filter((t) => t.id !== task.id)));
    // else if(status == '1') this.taskService.deleteTask(task).subscribe(() => (this.inProgress = this.inProgress.filter((t) => t.id !== task.id)));
    // else if(status == '2') this.taskService.deleteTask(task).subscribe(() => (this.done = this.done.filter((t) => t.id !== task.id)));
    
    // if(e.status == '0') this.todo = this.taskService.deleteTask(e.task);
    // if(e.status == '1') this.inProgress = this.taskService.deleteTask(e.task);
    // if(e.status == '2') this.done = this.taskService.deleteTask(e.task);

    // if(e.task.status == '0') this.todo = this.taskService.deleteTask(e.task);
    // else if(e.task.status == '1') this.inProgress = this.taskService.deleteTask(e.task);
    // else if(e.task.status == '2') this.done = this.taskService.deleteTask(e.task);
    // this.groups = [this.todo, this.inProgress, this.done];

    this.taskService.deleteTask(e.task);
    this.generateGroups();
    // console.log(this.groups);
  }

  // changeTaskStatus(task: Task, newStatus){
  //   task.status = newStatus;
  //   this.taskService.updateTaskStatus(task);
  // }

  applySorting(e){
    // this.taskService.sortTasks(this.todo, e.sort);
    this.groups.forEach(group => {
      this.taskService.sortTasks(group, e.sort);
    });
    // console.log(this.groups);
  }

  searchTasks(e){
    this.generateGroups();
    this.groups.forEach((group, index) => {
      // console.log(this.taskService.searchTasks(group, e));
      this.groups[index] = this.taskService.searchTasks(group, e);
    });
    // console.log(this.groups);
  }
}