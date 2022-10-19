import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ToDoItem } from '../models/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class ToDoServiceMock {
  todos = [
    {
      'id': '1',
      'description': 'test1',
      'type':'buy',
      'createTime': '2022-01-01',
      'amount': 1
    },
    {
      'id': '2',
      'description': 'test2',
      'type':'buy',
      'createTime': '2022-01-02',
      'amount': 2
    },
    {
      'id': '3',
      'description': 'test3',
      'type':'buy',
      'createTime': '2022-01-03',
      'amount': 3
    }
  ];
  getAll(): ToDoItem[] {
    return this.todos;
  }

  getOne(id: string): any {
    return this.todos.find(t => t.id === id);
  }

  createOne(body: ToDoItem): ToDoItem {
    const todo: ToDoItem = {
      ...body,
      id: uuidv4(),
      createTime: new Date().toISOString()
    };
    this.todos.push(todo);
    console.log(this.todos) 
    console.log(todo)
    return todo;
  }

  updateOne(id: string, body: ToDoItem): ToDoItem {
    const todo: ToDoItem | undefined = this.todos.find(t => t.id === id);
    if (todo) {
      todo.type = body.type;
      todo.amount = body.amount;
      todo.description = body.description;
      return todo;
    }
    else {
      return {
        'id': '',
        'description': '',
        'amount':'',
        'type':''
      };
    }
  }

  deleteOne(id: string): Observable<string> {
    const index: number = this.todos.findIndex(t => t.id === id);
    this.todos.splice(index, 1);
    this.write(this.todos);
    return of(id);
  }


  private write(items: ToDoItem[]): void {
    localStorage.setItem('todos', JSON.stringify(items));
  }
}
