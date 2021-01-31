import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shirt } from './shirt';


@Injectable({
  providedIn: 'root'
})
export class ShirtsService {

  constructor(private http:HttpClient) { }

  getAll() : Observable<Shirt[]> {
    return this.http.get<Shirt[]>(`${environment.MyURL}/shirts`);
  }

  add(shirt:Shirt): Observable<Shirt[]> {
    return this.http.post<Shirt[]>(`${environment.MyURL}/shirts`,shirt);
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${environment.MyURL}/shirts/${id}`);
  }

  update(shirt:Shirt): Observable<Shirt> {
    return this.http.put<Shirt>(`${environment.MyURL}/shirts`,shirt); 
  }

}
