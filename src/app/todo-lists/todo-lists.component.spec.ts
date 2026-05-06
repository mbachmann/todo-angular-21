import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListsComponent } from './todo-lists.component';
import { TodoItemControllerService, TodoListNameControllerService, TodoListNameDTO } from '../openapi-gen';
import { TodoService } from '../services/todo.service';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

describe('TodoListsComponent', () => {
  let component: TodoListsComponent;
  let fixture: ComponentFixture<TodoListsComponent>;
  let mockTodoListNameControllerService: {
    getAllTodoListNames: ReturnType<typeof vi.fn>;
    createTodoListName: ReturnType<typeof vi.fn>;
    updateTodoListName: ReturnType<typeof vi.fn>;
    deleteTodoListName: ReturnType<typeof vi.fn>;
  };
  let router: Router;

  beforeEach(async () => {
    mockTodoListNameControllerService = {
      getAllTodoListNames: vi.fn().mockName('TodoListNameControllerService.getAllTodoListNames'),
      createTodoListName: vi.fn().mockName('TodoListNameControllerService.createTodoListName'),
      updateTodoListName: vi.fn().mockName('TodoListNameControllerService.updateTodoListName'),
      deleteTodoListName: vi.fn().mockName('TodoListNameControllerService.deleteTodoListName'),
    };

    await TestBed.configureTestingModule({
      imports: [TodoListsComponent],
      providers: [
        { provide: TodoItemControllerService, useValue: {} },
        { provide: TodoListNameControllerService, useValue: mockTodoListNameControllerService },
        { provide: TodoService, useValue: {} },
        provideRouter([]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch todo list names on initialization', async () => {
    const mockTodoLists = initRefreshListReponse();
    await component.ngOnInit();
    expect(component.todoListNames()).toEqual(mockTodoLists);
  });

  it('should call createTodoListName when adding a new list', () => {
    (component as any).listNameTextField = () =>
      ({
        nativeElement: {
          value: 'New List',
          focus: () => {
            /* empty */
          },
          select: () => {
            /* empty */
          },
        },
      }) as unknown as ElementRef<HTMLInputElement>;
    mockTodoListNameControllerService.createTodoListName.mockReturnValue(of(new HttpResponse({ status: 201 })) as any);
    initRefreshListReponse();

    component.onEnterKeyDownField();

    expect(mockTodoListNameControllerService.createTodoListName).toHaveBeenCalled();
  });

  it('should call updateTodoListName when editing an existing list', () => {
    (component as any).listNameTextField = () =>
      ({
        nativeElement: {
          value: 'Updated List',
          focus: () => {
            /* empty */
          },
          select: () => {
            /* empty */
          },
        },
      }) as unknown as ElementRef<HTMLInputElement>;
    component.todoListNames.set([{ listId: '1', listName: 'Old List', count: 0 }]);
    component.editIndex = 0;
    mockTodoListNameControllerService.updateTodoListName.mockReturnValue(of(new HttpResponse({ status: 200 })) as any);
    initRefreshListReponse();

    component.onEnterKeyDownField();

    expect(mockTodoListNameControllerService.updateTodoListName).toHaveBeenCalledWith('1', expect.any(Object));
  });

  it('should navigate to todo item page onEnterKeyDownList', () => {
    component.onEnterKeyDownList('1');
    expect(router.navigate).toHaveBeenCalledWith(['/todoitem/', '1']);
  });

  it('should delete a todo list when onDelete is called', () => {
    mockTodoListNameControllerService.deleteTodoListName.mockReturnValue(of(new HttpResponse({ status: 200 })));
    initRefreshListReponse();

    component.onDelete('1');

    expect(mockTodoListNameControllerService.deleteTodoListName).toHaveBeenCalledWith('1');
  });

  function initRefreshListReponse() {
    const mockTodoLists: TodoListNameDTO[] = [
      {
        count: 3,
        listId: 'da2c63f8-b414-46fb-8ae9-c54c1e5c0f00',
        fromDate: '2025-03-11T08:27:45.741982Z',
        toDate: '2025-03-16T08:27:45.741990Z',
        listName: 'To-Do List for business',
      },
    ];
    mockTodoListNameControllerService.getAllTodoListNames.mockReturnValue(of(mockTodoLists as any));
    return mockTodoLists;
  }
});
