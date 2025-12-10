import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoLists } from './todo-lists.component';

describe('TodoLists', () => {
  let component: TodoLists;
  let fixture: ComponentFixture<TodoLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoLists);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
