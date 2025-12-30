import { Component, ElementRef, OnInit, inject, DestroyRef, signal, computed, viewChild } from '@angular/core';
import { TodoListName, TodoListNameControllerService, TodoListNameDTO } from '../openapi-gen';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClickStopPropagationDirective } from '../shared/directive/click-stop-propagation.directive';
import { KeydownStopPropagationDirective } from '../shared/directive/keydown-stop-propagation.directive';
import { getUUID } from '../shared/utils';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
  imports: [RouterLink, DatePipe, ClickStopPropagationDirective, KeydownStopPropagationDirective],
})
export class TodoListsComponent implements OnInit {
  private readonly todoListNameControllerService = inject(TodoListNameControllerService);
  private readonly router = inject(Router);

  readonly listNameTextField = viewChild<ElementRef<HTMLInputElement>>('listNameTextField');
  readonly todoListNames = signal<TodoListNameDTO[]>([]);
  readonly editingItem = computed(() => (this.editIndex >= 0 ? (this.todoListNames()[this.editIndex] ?? null) : null));
  editIndex = -1;

  ngOnInit(): void {
    this.refreshList();
  }

  async refreshList(): Promise<void> {
    try {
      const data = await firstValueFrom(this.todoListNameControllerService.getAllTodoListNames());
      this.todoListNames.set(data ?? []); // Signal-Update
    } catch (err) {
      console.error('Fehler beim Laden der Liste:', err);
    }
  }

  async onEnterKeyDownField(): Promise<void> {
    const inputField = this.listNameTextField()?.nativeElement;
    if (!inputField) return;

    const listName = inputField.value.trim();
    if (!listName) return;

    const isEditing = this.editIndex >= 0;
    const existingList = isEditing ? this.todoListNames()[this.editIndex] : null;

    const todoListName: TodoListName = {
      id: existingList?.listId ?? getUUID(),
      name: listName,
    };

    try {
      // Speichern (Create oder Update)
      if (isEditing) {
        await firstValueFrom(this.todoListNameControllerService.updateTodoListName(todoListName.id, todoListName));
      } else {
        await firstValueFrom(this.todoListNameControllerService.createTodoListName(todoListName));
      }
      await this.refreshList();
      this.resetInputField();
    } catch (err) {
      console.error('Fehler beim Speichern:', err);
    }
  }

  onEnterKeyDownList(listId: string | undefined) {
    this.router.navigate(['/todoitem/', listId]);
  }

  async onDelete(listId: string | undefined): Promise<void> {
    if (!listId) return;

    try {
      // Warten, bis der Lösch-Request abgeschlossen ist
      await firstValueFrom(this.todoListNameControllerService.deleteTodoListName(listId));

      // Danach Liste neu laden
      await this.refreshList();
      this.resetInputField();
    } catch (err) {
      console.error('Fehler beim Löschen:', err);
    }
  }

  onEdit(index: number) {
    this.editIndex = index;

    const input = this.listNameTextField()?.nativeElement;
    const item = this.editingItem(); // <-- computed read

    if (input && item?.listName != null) {
      input.value = item.listName;
      input.focus();
      input.select();
    }
  }

  resetInputField() {
    const inputField = this.listNameTextField()?.nativeElement;
    const isEditing = this.editIndex >= 0;
    if (isEditing) this.editIndex = -1;
    if (inputField) inputField.value = '';
  }
}
