import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }


  getAll() : Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.MyURL}/orders`);
  }

  add(order:Order): Observable<Order[]> {
    return this.http.post<Order[]>(`${environment.MyURL}/orders`,order);
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${environment.MyURL}/orders/${id}`);
  }

  update(order:Order): Observable<Order> {
    return this.http.put<Order>(`${environment.MyURL}/orders`,order); 
  }

}
