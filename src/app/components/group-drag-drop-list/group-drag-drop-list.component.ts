import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';
import { faTimes, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group-drag-drop-list',
  templateUrl: './group-drag-drop-list.component.html',
  styleUrls: ['./group-drag-drop-list.component.css']
})
export class GroupDragDropListComponent implements OnInit {
  tasks: Task[] = [];
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  faTimes = faTimes;
  faBell = faBell;
  showAddTask: boolean;
  subscription: Subscription;

  drop(event: CdkDragDrop<any[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    event.container.data.forEach(element => {
      if(element.status != event.container.id.slice(-1)){
        // console.log(element);
        this.changeTaskStatus(element, event.container.id.slice(-1));
      }
    });
    // console.log(event.container.id.slice(-1));
  }

  constructor(private taskService:TaskService, private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }

  ngOnInit(): void {
    // this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks)
    this.taskService.getTasksWithStatus('0').subscribe((tasks) => this.todo = tasks)
    this.taskService.getTasksWithStatus('1').subscribe((tasks) => this.inProgress = tasks)
    this.taskService.getTasksWithStatus('2').subscribe((tasks) => this.done = tasks)
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task)=>(this.todo.push(task)));
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  onDelete(task, status){
    // this.onDeleteTask.emit(task);
    // console.log(this.todo.filter((t) => t.id !== task.id));
    if(status == '0') this.taskService.deleteTask(task).subscribe(() => (this.todo = this.todo.filter((t) => t.id !== task.id)));
    else if(status == '1') this.taskService.deleteTask(task).subscribe(() => (this.inProgress = this.inProgress.filter((t) => t.id !== task.id)));
    else if(status == '2') this.taskService.deleteTask(task).subscribe(() => (this.done = this.done.filter((t) => t.id !== task.id)));
  }

  changeTaskStatus(task: Task, newStatus){
    // console.log(task);
    task.status = newStatus;
    this.taskService.updateTaskStatus(task).subscribe();
  }
}