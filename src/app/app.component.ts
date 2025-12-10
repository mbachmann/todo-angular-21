import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyFirst } from './my-first/my-first.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MyFirst, TodoListsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  protected readonly title = signal('todo-angular');

  title1 = 'From Variable 1';
  title2 = 'From Variable 2';
  title3 = 'From Variable 3';

  myEvent!: string;

  onMyEvent($event: string) {
    this.myEvent = $event;
  }
}
