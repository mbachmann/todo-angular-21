import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MyFirstComponent } from './my-first/my-first.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
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
