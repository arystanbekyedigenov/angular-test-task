import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

import { faTimes, faBell, faPlus, faEllipsisH, faCalendar, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.css']
})
export class DragDropListComponent implements OnInit {
  @Input() tasks: Task[];
  @Input() groupInfo;
  @Output() onDeleteTask = new EventEmitter();

  faTimes = faTimes;
  faBell = faBell;
  faPlus = faPlus;
  faEllipsisH = faEllipsisH;
  faCalendar = faCalendar;
  faCircle = faCircle;

  drop(event: CdkDragDrop<any[]>) {
    // console.log(event);
    // console.log(event.container.element.nativeElement.getAttribute('groupStatus'));
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event.container.data[event.previousIndex]);
      console.log(event.container.data[event.currentIndex]);
      this.switchTasksPositions(event.container.data[event.previousIndex], event.container.data[event.currentIndex]);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    event.container.data.forEach(element => {
      if(element.status != event.container.element.nativeElement.getAttribute('groupStatus')){
        this.changeTaskStatus(element, event.container.element.nativeElement.getAttribute('groupStatus'));
      }
    });
  }

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
  }

  onDelete(task: Task){
    // console.log(task);
    this.onDeleteTask.emit({task});
  }

  changeTaskStatus(task: Task, newStatus){
    task.status = newStatus;
    this.taskService.updateTaskStatus(task);
  }

  switchTasksPositions(previousTask: Task, currentTask: Task){
    this.taskService.switchTasksPositions(previousTask, currentTask);
  }
}
