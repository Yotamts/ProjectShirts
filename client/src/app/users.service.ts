import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }


  getAll() : Observable<User[]> {
    return this.http.get<User[]>(`${environment.MyURL}/users`);
  }

  add(user:User): Observable<User[]> {
    return this.http.post<User[]>(`${environment.MyURL}/users`,user);
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${environment.MyURL}/users/${id}`);
  }

  update(user:User): Observable<User> {
    return this.http.put<User>(`${environment.MyURL}/users`,user); 
  }

}
