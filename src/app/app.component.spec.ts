import { TestBed } from '@angular/core/testing';
import { App } from './app.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { RouterModule } from '@angular/router';
import { ApiModule, BASE_PATH, TodoItemControllerService, TodoListNameDTO } from './openapi-gen';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;
  let baseUrl: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        RouterModule.forRoot([
          { path: 'home', component: TodoListsComponent },
          { path: '', component: TodoListsComponent },
        ]),
      ],
      providers: [
        TodoItemControllerService,
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(ApiModule),
        {
          provide: BASE_PATH,
          useValue: environment.API_BASE_PATH,
        },
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    baseUrl = environment.API_BASE_PATH;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-angular'`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title()).toEqual('todo-angular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('Todo App');
  });

  it('should navigate to home and display TodoListsComponent', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const harness = await RouterTestingHarness.create();
    const activatedComponent = await harness.navigateByUrl('/', TodoListsComponent);

    const reqListNames = httpMock.expectOne(baseUrl + '/api/v1/todolist-names');
    expect(reqListNames.request.method).toEqual('GET');

    const todoListNames: TodoListNameDTO[] = [
      { count: 3, listId: 'da2c63f8-b414-46fb-8ae9-c54c1e5c0f00', fromDate: '2025-03-11T08:27:45.741982Z', toDate: '2025-03-16T08:27:45.741990Z', listName: 'To-Do List for business' },
      { count: 3, listId: '2f9c96e1-51ab-47b5-aec9-30980eef61c0', fromDate: '2025-03-11T08:27:45.750231Z', toDate: '2025-03-16T08:27:45.750234Z', listName: 'To-Do List for homework' },
    ];

    reqListNames.flush(todoListNames);
    await fixture.whenStable(); // wait for async update

    expect(activatedComponent.todoListNames()).toEqual(todoListNames);
  });

});
