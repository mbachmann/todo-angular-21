import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { importProvidersFrom } from '@angular/core';
import { ApiModule, BASE_PATH, TodoItemControllerService } from '../openapi-gen';
import { environment } from '../../environments/environment';

describe('TodoService', () => {
  let ownTodoService: TodoService;
  let openApiTodoService: TodoItemControllerService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TodoService,
        TodoItemControllerService,
        provideHttpClient(),
        provideHttpClientTesting(),
        importProvidersFrom(ApiModule),
        {
          provide: BASE_PATH,
          useValue: environment.API_BASE_PATH,
        },
      ],
    });
    ownTodoService = TestBed.inject(TodoService);
    openApiTodoService = TestBed.inject(TodoItemControllerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(ownTodoService).toBeTruthy();
    expect(openApiTodoService).toBeTruthy();
  });

  it('should call getListIDs from own service', async () => {
    const dataPromise = firstValueFrom(ownTodoService.getListIDs());
    const req = httpMock.expectOne(`${environment.API_BASE_PATH}/api/v1/listids`);
    expect(req.request.method).toBe('GET');
    req.flush({ count: 2, todoItemList: [{ listId: '1' }, { listId: '2' }] });
    const data = await dataPromise;
    expect(data.count).toBe(data.todoItemList?.length);
  });

  it('should call getListIDs from OpenApi', async () => {
    const dataPromise = firstValueFrom(openApiTodoService.getListIDs());
    const req = httpMock.expectOne(`${environment.API_BASE_PATH}/api/v1/listids`);
    expect(req.request.method).toBe('GET');
    req.flush({ count: 2, todoItemList: [{ listId: '1' }, { listId: '2' }] });
    const data = await dataPromise;
    expect(data.count).toBe(data.todoItemList?.length);
  });
});
