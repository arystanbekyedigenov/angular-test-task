import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faCheckSquare, faTimes, faSort, faThLarge, faFilter, faPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Task } from '../../Task';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() onSortApply: EventEmitter<any> = new EventEmitter();
  @Output() onTaskSearch: EventEmitter<any> = new EventEmitter();
  @Output() onTaskAdd: EventEmitter<any> = new EventEmitter();
  @Output() onGroupAdd: EventEmitter<any> = new EventEmitter();

  faCheckSquare = faCheckSquare;
  faTimes = faTimes;
  faSort = faSort;
  faThLarge = faThLarge;
  faFilter = faFilter;
  faPlus = faPlus;
  faEllipsisH = faEllipsisH;

  showAddTask: boolean;

  form = new FormGroup({
    sort: new FormControl('name', Validators.required)
  });

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  showSortings: boolean;
  showAddGroup: boolean;
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;

  groupName: string;
  bgColor: string = "#ff0000";

  constructor(private uiService: UiService) {
    this.subscription1 = this.uiService.onToggleSorting().subscribe(value => this.showSortings = value);
    this.subscription2 = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
    this.subscription3 = this.uiService.onToggleGroup().subscribe(value => this.showAddGroup = value);
    this.searchForm.get('search').valueChanges.subscribe(value => this.onTaskSearch.emit(value));
  }

  ngOnInit(): void {
  }

  console(){
    console.log(typeof(this.faCheckSquare));
  }

  showSorting(){
    this.uiService.toggleSorting();
  }

  showFilter(){
    this.uiService.toggleFilter();
  }

  onSubmit(){
    // console.log(this.form.value);
    this.onSortApply.emit(this.form.value);
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  onAddTask(task: Task){
    // console.log(task);
    this.onTaskAdd.emit(task);
  }

  toggleAddGroup(){
    this.uiService.toggleAddGroup();
  }

  onAddGroup(){
    if(!this.groupName){
      alert('Please, Add Group Name!');
      return;
    }

    const newGroup = {
      groupName: this.groupName,
      groupStatus: this.generateID(),
      headerColor: this.bgColor,
      isGroup: "true"
    }

    this.onGroupAdd.emit(newGroup);

    this.groupName = '';
    this.bgColor = '#ff0000';
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

}
