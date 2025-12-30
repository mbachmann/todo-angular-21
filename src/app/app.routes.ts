import { Routes } from '@angular/router';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { MyFirstComponent } from './my-first/my-first.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'home',
    component: TodoListsComponent,
  },
  {
    path: 'myfirst',
    component: MyFirstComponent,
  },
  {
    path: 'todoitem/:id',
    component: TodoItemsComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];
