import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import * as appComponent from './app.component';
import { GroupDragDropListComponent } from './components/group-drag-drop-list/group-drag-drop-list.component';
import { ButtonComponent } from './components/button/button.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { DragDropListComponent } from './components/drag-drop-list/drag-drop-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

@NgModule({
  declarations: [
    appComponent.AppComponent,
    GroupDragDropListComponent,
    ButtonComponent,
    TasksComponent,
    TaskItemComponent,
    DragDropListComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [appComponent.AppComponent]
})
export class AppModule { }
