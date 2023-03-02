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
    this.generateGroups();
  }

  generateGroups(){
    this.groups = [];
    this.groupsInfo = [];

    this.taskService.getGroups().forEach(group => {
      this.groups.push(this.taskService.getTasksWithStatus(group.groupStatus));
      this.groupsInfo.push(group);
    })
  }

  addTask(task: Task){
    this.taskService.addTask(task);
    this.generateGroups();
  }

  addGroup(group){
    this.taskService.addGroup(group);
    this.generateGroups();
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  onDelete(e){
    this.taskService.deleteTask(e.task);
    this.generateGroups();
  }

  applySorting(e){
    this.groups.forEach(group => {
      this.taskService.sortTasks(group, e.sort);
    });
  }

  searchTasks(e){
    this.generateGroups();
    this.groups.forEach((group, index) => {
      this.groups[index] = this.taskService.searchTasks(group, e);
    });
  }
}