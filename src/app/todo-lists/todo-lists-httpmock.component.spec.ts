import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListsComponent } from './todo-lists.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiModule, BASE_PATH, TodoItemControllerService, TodoListNameDTO } from '../openapi-gen';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

describe('TodoListsComponent Test with http mock', () => {
  let component: TodoListsComponent;
  let fixture: ComponentFixture<TodoListsComponent>;
  let httpMock: HttpTestingController;
  let baseUrl: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListsComponent],
      providers: [
        TodoItemControllerService,
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(ApiModule),
        provideHttpClientTesting(),
        { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    baseUrl = environment.API_BASE_PATH;
    fixture = TestBed.createComponent(TodoListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  display TodoListsComponent with 3 items', async () => {
    const req = httpMock.expectOne(baseUrl + '/api/v1/todolist-names');
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    const todoList: TodoListNameDTO[] = [
      {
        count: 3,
        listId: 'da2c63f8-b414-46fb-8ae9-c54c1e5c0f00',
        fromDate: '2025-03-11T08:27:45.741982Z',
        toDate: '2025-03-16T08:27:45.741990Z',
        listName: 'To-Do List for business',
      },
      {
        count: 3,
        listId: '2f9c96e1-51ab-47b5-aec9-30980eef61c0',
        fromDate: '2025-03-11T08:27:45.750231Z',
        toDate: '2025-03-16T08:27:45.750234Z',
        listName: 'To-Do List for homework',
      },
      {
        count: 3,
        listId: '2e45aace-3823-413e-a145-0cab9cc7a115',
        fromDate: '2025-03-11T08:27:45.753923Z',
        toDate: '2025-03-16T08:27:45.753927Z',
        listName: 'To-Do List for private',
      },
    ];

    req.flush(todoList);
    await fixture.whenStable();
    fixture.detectChanges();

    console.log('TodoListComponent.todoLists.count', component.todoListNames().length);
    expect(todoList.length).toEqual(component.todoListNames().length) ;
    expect(todoList).toEqual(component.todoListNames()) ;
  });
});
