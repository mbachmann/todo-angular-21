import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Subscription } from 'rxjs';
import { TodoItemListsDTO } from '../model/todoItemListsDTO';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
  imports: [RouterLink],
  standalone: true
})
export class TodoListsComponent implements OnInit  {

  todoLists?: string[] = [];
  private subscription: Subscription | undefined;

  constructor(private readonly todoService:TodoService) {}

  ngOnInit(): void {
    this.subscription = this.todoService.getListIDs().subscribe({
      next: (data: TodoItemListsDTO) => this.todoLists = data.todoItemList,
      error: err => console.log(err)
    });
  }

}

