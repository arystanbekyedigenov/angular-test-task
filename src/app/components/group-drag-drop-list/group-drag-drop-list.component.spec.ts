import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDragDropListComponent } from './group-drag-drop-list.component';

describe('GroupDragDropListComponent', () => {
  let component: GroupDragDropListComponent;
  let fixture: ComponentFixture<GroupDragDropListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupDragDropListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupDragDropListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
