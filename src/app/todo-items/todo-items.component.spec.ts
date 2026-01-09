import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoItemsComponent } from './todo-items.component';
import { TodoItem, TodoItemControllerService, TodoListNameControllerService } from '../openapi-gen';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ElementRef, importProvidersFrom } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

describe('TodoItemsComponent', () => {
  let component: TodoItemsComponent;
  let fixture: ComponentFixture<TodoItemsComponent>;
  let mockTodoItemControllerService: jasmine.SpyObj<TodoItemControllerService>;
  let mockTodoListNameControllerService: jasmine.SpyObj<TodoListNameControllerService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockTodoItemControllerService = jasmine.createSpyObj('TodoItemControllerService', [
      'deleteTodoItem',
      'changeDoneState',
      'getItem',
      'editTodoItem',
      'newTodoItem',
      'getItemsOfOneList',
    ]);

    mockTodoListNameControllerService = jasmine.createSpyObj('TodoListNameControllerService', [ 'getTodoListNameById', ]);

    mockActivatedRoute = {
      params: of({ id: '123' }),
    };

    mockTodoItemControllerService.getItemsOfOneList.and.returnValue( of([
      { taskName: 'Task 1', listId: '123', done: false },
      { taskName: 'Task 2', listId: '123', done: true },
    ] as any));

    mockTodoListNameControllerService.getTodoListNameById.and.returnValue( of({ id: '123', name: 'My List' } as any) );

    await TestBed.configureTestingModule({
      imports: [TodoItemsComponent],
      providers: [
        { provide: TodoItemControllerService, useValue: mockTodoItemControllerService },
        { provide: TodoListNameControllerService, useValue: mockTodoListNameControllerService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        importProvidersFrom(FormsModule),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemsComponent);
    component = fixture.componentInstance;

    // Mocking the ViewChild reference
    (component as any).taskNameTextField = () =>
      ({ nativeElement: {
        value: 'New Task',
          focus: () => {},
          select: () => {},
        },
      } as unknown as ElementRef<HTMLInputElement>);
  });

  it('should display the listId in the template', () => {
    component.listId = '123';
    component.todoItems.set([
      { taskName: 'Task 1', listId: '123' },
      { taskName: 'Task 2', listId: '123' },
    ] as TodoItem[]);
    fixture.detectChanges();

    const listInfo = fixture.debugElement.query(By.css('.todo-info')).nativeElement;
    const text: string = listInfo.textContent;
    expect(text.endsWith('123')).toBe(true);
  });

  it('should display the number of todo items', () => {
    component.todoItems.set([{ taskName: 'Task 1' }, { taskName: 'Task 2' }] as TodoItem[]);
    fixture.detectChanges();

    const listInfo = fixture.debugElement.query(By.css('.todo-listinfo')).nativeElement;
    expect(listInfo.textContent).toContain('Todo Items : 2 Items');
  });

  it('should add a new task on enter key press', async () => {
    mockTodoItemControllerService.newTodoItem.and.returnValue(of({} as any));
    spyOn(component, 'refreshList').and.callThrough();

    const inputElement = fixture.debugElement.query(By.css('#taskNameTextField')).nativeElement;
    inputElement.value = 'New Task';
    fixture.detectChanges();
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    await fixture.whenStable();

    expect(mockTodoItemControllerService.newTodoItem).toHaveBeenCalledWith(
      jasmine.objectContaining({ taskName: 'New Task' })
    );
    expect(component.refreshList).toHaveBeenCalled();
  });


  it('should render todo items with proper details', () => {
    component.todoItems.set([
      { taskName: 'Task 1', done: false, itemId: 1, listId: '123' },
      { taskName: 'Task 2', done: true, itemId: 2, listId: '123' },
    ] as any);
    fixture.detectChanges();

    const todoItems = fixture.debugElement.queryAll(By.css('.row'));
    expect(todoItems.length).toBe(3);

    const firstItemText = todoItems[1].query(By.css('span')).nativeElement.textContent;
    const secondItemText = todoItems[2].query(By.css('span')).nativeElement.textContent;

    expect(firstItemText).toContain('Task 1');
    expect(secondItemText).toContain('Task 2');
  });

  it('should call onDelete when delete button is clicked', () => {
    spyOn(component, 'onDelete');
    component.todoItems.set([{ taskName: 'Task 1', done: false, itemId: 1 }] as any);
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('.fa-trash')).parent;
    if (deleteButton) deleteButton.triggerEventHandler('click', null);

    expect(component.onDelete).toHaveBeenCalledWith(1);
  });

  it('should call onEdit when edit button is clicked', () => {
    spyOn(component, 'onEdit');
    component.todoItems.set([{ taskName: 'Task 1', done: false, itemId: 1 }] as any);
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css('.fa-edit')).parent;
    if (editButton) editButton.triggerEventHandler('click', null);

    expect(component.onEdit).toHaveBeenCalledWith(0);
  });

  it('should call onDone when checkbox is clicked', () => {
    spyOn(component, 'onDone');
    component.todoItems.set([{ taskName: 'Task 1', done: false, itemId: 1 }] as any);
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    checkbox.triggerEventHandler('click', null);

    expect(component.onDone).toHaveBeenCalledWith(1);
  });
});
