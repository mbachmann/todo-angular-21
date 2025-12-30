import { Routes } from '@angular/router';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { MyFirstComponent } from './my-first/my-first.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';

export const routes: Routes = [
  {
    path: 'home',
    component: TodoListsComponent
  },
  {
    path: 'myfirst',
    component: MyFirstComponent
  },
  {
    path: 'todoitem/:id',
    component: TodoItemsComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  }
];
