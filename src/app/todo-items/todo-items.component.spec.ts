import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemsComponent } from './todo-items.component';
import { ActivatedRoute } from '@angular/router';
import { TodoItemControllerService, TodoListNameControllerService } from '../openapi-gen';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';

describe('TodoItemsComponent', () => {
  let component: TodoItemsComponent;
  let fixture: ComponentFixture<TodoItemsComponent>;

  const todoItemControllerServiceMock = {
    getItemsOfOneList: () => of([]),
  };

  const todoListNameControllerServiceMock = {
    getTodoListNameById: () => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test-list-id' }),
          },
        },
        { provide: TodoItemControllerService, useValue: todoItemControllerServiceMock },
        { provide: TodoListNameControllerService, useValue: todoListNameControllerServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
