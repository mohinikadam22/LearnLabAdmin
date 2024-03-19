import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject = new Subject<any>();

  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


  addToCart(userId: string, courseId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}/cart/`;
    return this.http.post(url, { courseId });
  }
  getCart(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}/cart`;
    return this.http.get(url);
  }

  removeFromCart(userId: string, courseId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}/cart/${courseId}`;
    return this.http.delete(url);
  }


}