import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Todo', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
