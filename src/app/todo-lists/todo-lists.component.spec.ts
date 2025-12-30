import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListsComponent } from './todo-lists.component';

describe('TodoLists', () => {
  let component: TodoListsComponent;
  let fixture: ComponentFixture<TodoListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
