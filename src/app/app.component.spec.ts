import { TestBed } from '@angular/core/testing';
import { App } from './app.component';
import { RouterModule } from '@angular/router';
import { TodoListsComponent } from './todo-lists/todo-lists.component';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        RouterModule.forRoot([
          { path: 'home', component: TodoListsComponent },
          { path: '', component: TodoListsComponent },
        ]),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div.navbar-brand')?.textContent).toContain('Todo App');
  });
});
