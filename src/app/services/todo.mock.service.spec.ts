import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ApiModule, BASE_PATH, TodoItemControllerService, TodoItemListsDTO } from '../openapi-gen';
import { environment } from '../../environments/environment';

describe('TodoService with Mock', () => {
  let ownTodoService: TodoService;
  let openApiTodoService: TodoItemControllerService;
  let httpMock: HttpTestingController;
  let baseUrl: string;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TodoService,
        importProvidersFrom(ApiModule),
        {
          provide: BASE_PATH,
          useValue: environment.API_BASE_PATH,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    ownTodoService = TestBed.inject(TodoService);
    openApiTodoService = TestBed.inject(TodoItemControllerService);
    httpMock = TestBed.inject(HttpTestingController);
    baseUrl = environment.API_BASE_PATH;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(ownTodoService).toBeTruthy();
    expect(openApiTodoService).toBeTruthy();
  });

  it('should call the mock backend for getListIDs from own service', async () => {
    ownTodoService.getListIDs().subscribe(data => {
      console.log('TodoService.MockBackend.data.countdata.count', data.count);
      expect(data.count).toBe(data.todoItemList?.length);
    });
    const req = httpMock.expectOne(baseUrl + '/api/v1/listids');
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    const todoList: TodoItemListsDTO = {
      count: 2,
      todoItemList: ['083e8820-0186-4c68-af01-af2ced91805a', '1da5ba97-4365-4560-bb23-2335f099288e'],
    };
    req.flush(todoList);
  });

  it('should call the mock backend for getListIDs from OpenApi service', async () => {
    openApiTodoService.getListIDs().subscribe(data => {
      console.log('TodoService.MockBackend.data.countdata.count', data.count);
      expect(data.count).toBe(data.todoItemList?.length);
    });
    const req = httpMock.expectOne(baseUrl + '/api/v1/listids');
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    const todoList: TodoItemListsDTO = {
      count: 2,
      todoItemList: ['083e8820-0186-4c68-af01-af2ced91805a', '1da5ba97-4365-4560-bb23-2335f099288e'],
    };
    req.flush(todoList);
  });
});
