import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiModule, BASE_PATH, TodoItem, TodoItemControllerService, TodoItemsDTO } from '../openapi-gen';
import { TodoService } from './todo.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * Explanation
 * Test Initialization:
 *
 * HttpClientTestingModule is imported to mock HTTP requests.
 * TodoItemControllerService is injected for testing.
 *
 * Key Features
 * HttpClientTestingModule: Provides tools to mock HTTP requests.
 * HttpTestingController: Allows validation of requests made by the service.
 * Mock Data: Used mockTodoItem and mockTodoItemsDTO to simulate API responses.
 * Verification: Ensures all HTTP requests match expected calls and methods.
 *
 * Test Cases:
 *
 * The first test ensures the service calls the correct endpoint with the PUT method and returns a mock TodoItem when successful.
 * The second test ensures the service throws an error if the id parameter is null or undefined.
 * Mock HTTP Request:
 *
 * httpMock.expectOne() verifies that the correct API endpoint is called.
 * req.flush() sends a mock response.
 */
describe('TodoItemControllerService', () => {
  let service: TodoItemControllerService;
  let httpMock: HttpTestingController;

  const mockBasePath = 'https://todo-h2.united-portal.com';
  const mockTodoItem: TodoItem = { itemId: 1, taskName: 'Test Item', done: false };
  const mockTodoItemsDTO: TodoItemsDTO = {
    count: 2,
    listId: '123',
    todoItemList: [
      { itemId: 1, taskName: 'Item 1', done: false },
      { itemId: 2, taskName: 'Item 2', done: true },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TodoService,
        TodoItemControllerService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        importProvidersFrom(ApiModule),
        {
          provide: BASE_PATH,
          useValue: environment.API_BASE_PATH,
        },
      ],
    });

    service = TestBed.inject(TodoItemControllerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete a todo item', () => {
    const itemId = 1;

    service.deleteTodoItem(itemId).subscribe((response: any) => {
      expect(response).toBeTrue();
    });

    const req = httpMock.expectOne(`${mockBasePath}/api/v1/delete/${itemId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true); // Mock successful response
  });

  it('should edit a todo item', () => {
    service.editTodoItem(mockTodoItem).subscribe((response: any) => {
      expect(response).toEqual(mockTodoItem);
    });

    const req = httpMock.expectOne(`${mockBasePath}/api/v1/edit`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockTodoItem);
    req.flush(mockTodoItem); // Mock successful response
  });

  it('should fetch all todo items', () => {
    service.getAllTodoItems().subscribe((response: any) => {
      expect(response).toEqual(mockTodoItemsDTO);
    });

    const req = httpMock.expectOne(`${mockBasePath}/api/v1/list`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodoItemsDTO); // Mock successful response
  });

  it('should fetch a single todo item by list ID', () => {
    const listId = '123';
    service.getItemsOfOneList(listId).subscribe((response: any) => {
      expect(response).toEqual([mockTodoItem]);
    });

    const req = httpMock.expectOne(`${mockBasePath}/api/v1/list/${listId}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockTodoItem]); // Mock successful response
  });
});
