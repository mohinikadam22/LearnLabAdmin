import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

function _window() : any{
  return window
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  get nativeWindow() : any {
    return _window();
  }

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  initiatePayment(id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/initiate`, {id});
  }

  handlePaymentSuccess(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/success`, data);
  }

  
  makePayment(courseId: string, userId: string): Observable<any> {
    const url = `${this.apiUrl}/payment/${courseId}/${userId}`;
    return this.http.post<any>(url, {});
  }

  verifyPayment(response: any): Observable<any> {
    // Call your backend API to verify the payment
    return this.http.post<any>(`${this.apiUrl}/verifypayment`,  response );
  }
}
