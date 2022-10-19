import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { v4 as uuidv4 } from 'uuid';
import { ToDoItem } from '../models/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
    private baseApi = 'https://localhost:7249/api/items'
    constructor(private http : HttpClient){}
    getAll(): Observable<any> {
        return this.http.get(this.baseApi);
    }
    
    getOne(id:any):  Observable<any> {
        return this.http.get(`${this.baseApi}/${id}`,{params:id});
    }
    
    createOne(body: ToDoItem): Observable<any> {
        return this.http.post(this.baseApi,{...body});
    }

    updateOne(id: string, body: ToDoItem):  Observable<any> {
        return this.http.put(`${this.baseApi}/${id}`,{...body});
    }

    deleteOne(id: any): Observable<any> {
        return this.http.delete(`${this.baseApi}/${id}`,{params:id});
    }


    private write(items: ToDoItem[]): void {
    localStorage.setItem('todos', JSON.stringify(items));
    }

}