import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>();

  private showSortings: boolean = false;
  private sortingSubject = new Subject<any>();

  private showAddGroup: boolean = false;
  private groupSubject = new Subject<any>();

  constructor() { }

  toggleAddTask():void{
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  toggleFilter(){}
  
  toggleSorting(){
    this.showSortings = !this.showSortings;
    this.sortingSubject.next(this.showSortings);
  }

  onToggleSorting(): Observable<any> {
    return this.sortingSubject.asObservable();
  }

  toggleAddGroup():void{
    this.showAddGroup = !this.showAddGroup;
    this.groupSubject.next(this.showAddGroup);
  }

  onToggleGroup(): Observable<any> {
    return this.groupSubject.asObservable();
  }
}
