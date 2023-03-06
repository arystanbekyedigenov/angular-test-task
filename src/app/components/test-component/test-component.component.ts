import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {
  tables = [
    { title: 'Table A', items: ['Item 1', 'Item 2', 'Item 3'] },
    { title: 'Table B', items: ['Item 4', 'Item 5', 'Item 6'] },
    { title: 'Table C', items: ['Item 7', 'Item 8', 'Item 9'] }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  dropItem(event: CdkDragDrop<any[]>) {
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
  }

  dropTable(event: CdkDragDrop<any[]>) {
    console.log(event);
    moveItemInArray(this.tables, event.previousIndex, event.currentIndex);
  }

}
