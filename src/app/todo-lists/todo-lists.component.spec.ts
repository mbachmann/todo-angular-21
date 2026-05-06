import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListsComponent } from './todo-lists.component';
import { provideRouter } from '@angular/router';
import { TodoListNameControllerService } from '../openapi-gen';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';

describe('TodoLists', () => {
  let component: TodoListsComponent;
  let fixture: ComponentFixture<TodoListsComponent>;

  const todoListNameControllerServiceMock = {
    getAllTodoListNames: () => of([]),
    updateTodoListName: () => of({}),
    createTodoListName: () => of({}),
    deleteTodoListName: () => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListsComponent],
      providers: [provideRouter([]), { provide: TodoListNameControllerService, useValue: todoListNameControllerServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
