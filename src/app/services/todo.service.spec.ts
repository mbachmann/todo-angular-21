import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { importProvidersFrom } from '@angular/core';
import { ApiModule, BASE_PATH, TodoItemControllerService } from '../openapi-gen';
import { environment } from '../../environments/environment';

describe('TodoService with real Backend', () => {
  let ownTodoService: TodoService;
  let openApiTodoService: TodoItemControllerService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TodoService,
        TodoItemControllerService,
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(ApiModule),
        {
          provide: BASE_PATH,
          useValue: environment.API_BASE_PATH,
        },
      ],
    });
    ownTodoService = TestBed.inject(TodoService);
    openApiTodoService = TestBed.inject(TodoItemControllerService);
  });

  it('should be created', () => {
    expect(ownTodoService).toBeTruthy();
    expect(openApiTodoService).toBeTruthy();
  });

  it('should call the real backend for getListIDs from own Service', async () => {
    const data = await firstValueFrom(ownTodoService.getListIDs());
    console.log('TodoService.RealBackend.data.count', data.count);
    expect(data.count).toBe(data.todoItemList?.length);
  });

  it('should call the real backend for getListIDs from OpenApi', async () => {
    const data = await firstValueFrom(openApiTodoService.getListIDs());
    console.log('TodoService.RealBackend.data.count', data.count);
    expect(data.count).toBe(data.todoItemList?.length);
  });
});
