import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import * as appComponent from './app.component';
import { GroupDragDropListComponent } from './components/group-drag-drop-list/group-drag-drop-list.component';
import { ButtonComponent } from './components/button/button.component';
import { DragDropListComponent } from './components/drag-drop-list/drag-drop-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponentComponent } from './components/test-component/test-component.component';

@NgModule({
  declarations: [
    appComponent.AppComponent,
    GroupDragDropListComponent,
    ButtonComponent,
    DragDropListComponent,
    AddTaskComponent,
    HeaderComponent,
    TestComponentComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [appComponent.AppComponent]
})
export class AppModule { }
