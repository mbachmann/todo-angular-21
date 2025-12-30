import { Component, ElementRef, inject, OnDestroy, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { TodoItem, TodoItemControllerService, TodoListNameControllerService, TodoListNameDTO } from '../openapi-gen';
import { ActivatedRoute, Router } from '@angular/router';
import { parseIsoDateStrToDate } from '../shared/utils';
import { DatePipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss'],
  imports: [NgStyle, DatePipe],
})
export class TodoItemsComponent implements OnInit {
  private readonly taskNameTextField = viewChild.required<ElementRef<HTMLInputElement>>('taskNameTextField');
  private readonly route = inject(ActivatedRoute);
  private readonly todoItemControllerService = inject(TodoItemControllerService);
  private readonly todoListNameControllerService = inject(TodoListNameControllerService);
  readonly todoItems = signal<TodoItem[]>([]);
  readonly todoListInfo = signal<TodoListNameDTO>({});
  private editIndex = -1;
  private listId = '';

  async ngOnInit(): Promise<void> {
    const params = await firstValueFrom(this.route.params);
    this.listId = params['id'];
    console.log(this.listId);

    await this.refreshList(this.listId);
  }

  getListId(id: number): string | undefined {
    if (this.todoItems().length > 0) {
      return this.todoItems()[id].listId;
    }
    return '';
  }

  async onDelete(itemId: number | undefined): Promise<void> {
    if (itemId === undefined) return;
    try {
      await firstValueFrom(this.todoItemControllerService.deleteTodoItem(itemId));
      await this.refreshList(this.listId);
    } catch (err: any) {
      console.error(err);
    }
  }

  onEdit(index: number) {
    if (this.taskNameTextField !== undefined) {
      this.taskNameTextField().nativeElement.value = this.todoItems()[index].taskName;
      this.editIndex = index;
    }
  }

  async onDone(itemId: number | undefined): Promise<void> {
    if (itemId === undefined) return;
    try {
      await firstValueFrom(this.todoItemControllerService.changeDoneState(itemId));
      await this.refreshList(this.listId);
    } catch (err: any) {
      console.error(err);
    }
  }

  async refreshList(listId: string): Promise<void> {
    try {
      const data = await firstValueFrom(this.todoItemControllerService.getItemsOfOneList(listId));
      data.forEach(item => (
        item.createdAt = parseIsoDateStrToDate(item.createdAt)
      ));
      this.todoItems.set(data ?? []);
      const listInfo = await firstValueFrom(this.todoListNameControllerService.getTodoListNameById(listId));
      this.todoListInfo.set(listInfo);
      if (this.taskNameTextField !== undefined) {
        this.taskNameTextField().nativeElement.focus();
        this.taskNameTextField().nativeElement.select();
      }
    } catch (err) {
      console.error('Fehler beim Laden der Liste:', err);
    }
  }


  async onEnterKeyDown(): Promise<void> {
    const el = this.taskNameTextField().nativeElement;
    if (!el) return;

    const taskName = el.value.trim();
    if (!taskName.length) return;

    try {
      const idx = this.editIndex;
      if (idx >= 0) {
        // Edit existing
        const items = this.todoItems();
        const updated: TodoItem = { ...items[idx], taskName };
        await firstValueFrom(this.todoItemControllerService.editTodoItem(updated));
        this.editIndex = -1;
      } else {
        // Create new
        const todoItem: TodoItem = {
          taskName,
          listId: this.listId,
          done: false,
        };
        await firstValueFrom(this.todoItemControllerService.newTodoItem(todoItem));
      }

      el.value = '';
      await this.refreshList(this.listId);
    } catch (err: any) {
      console.error(err);
    }
  }

}
