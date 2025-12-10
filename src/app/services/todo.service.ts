import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoItemListsDTO } from '../model/todoItemListsDTO';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = environment.API_BASE_PATH;
  }

  getListIDs(): Observable<TodoItemListsDTO> {
    return this.http.get(this.baseUrl + '/api/v1/listids');
  }

  private todos = ['Kochen', 'Einkaufen', 'Wohnung reinigen'];

  getTodos(): string[] {
    return this.todos;
  }
  getObservableTodos(): Observable<string[]> {
    return of(this.todos);
  }
}
