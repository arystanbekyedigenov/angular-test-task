import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string;
  type: string;
  day: string;
  priority: number = 1;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService:UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }

  ngOnInit(): void {
  }

  generateID(): string {
    let id = 0;
    if(localStorage.length == 0) return id.toString();
    for (var i = 0; i < localStorage.length; i++){
      if( parseInt(localStorage.key(i)) && parseInt(localStorage.key(i)) > id ){
        id = parseInt(localStorage.key(i));
      }
    }
    return (id + 1).toString();
  }

  findAvailableGroup(): string | null{
    let status = 999;
    if(localStorage.length == 0) return null;
    for (var i = 0; i < localStorage.length; i++){
      let group = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if(group.isGroup && parseInt(group.groupStatus) < status) status = parseInt(group.groupStatus);
    }
    return (status).toString();
  }

  onSubmit(){
    if(!this.text) {
      alert('Please, Add a task!');
      return;
    }

    if(!this.findAvailableGroup()){
      alert('No Groups Available!');
      return;
    }

    const newTask = {
      id: this.generateID(),
      text: this.text,
      type: this.type,
      day: this.day,
      reminder: this.reminder,
      createDate: new Date(),
      priority: this.priority,
      status: this.findAvailableGroup()
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.type = '';
    this.day = '';
    this.reminder = false;
  }

}
