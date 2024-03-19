import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,tap, BehaviorSubject} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

interface User {
  email: string;
  password: string;
  username: string;
}

interface AuthResponse {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  private apiUrl = 'http://localhost:3000';                                  // Your API URL here
  private token ="";
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,private router: Router) {}

  register(user: User): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, user).pipe(
      tap((response: any) => {
        this.token = response.token;
        localStorage.setItem('token', response.token);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, { email, password }).pipe(
      tap((response: any) => {
        this.setToken(response.token);
        this.setUser(response.id,response.username,response.email)
        localStorage.setItem('token', response.token);
        localStorage.setItem('email',response.email)
        localStorage.setItem('id',response.id)
        return response;
      })
    );
  }

  allUser(){
    return this.http.get(`${this.apiUrl}/allUsers`)
  }
  
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/userById/${id}`);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['landing']);
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  
  setUser(userId: string,username:string,email:string) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('username',username)
    localStorage.setItem('email',email)
  }

  getUser() {
    const UserID = localStorage.getItem('userId');
    const Username = localStorage.getItem('username');
    const Email = localStorage.getItem('email')
    const Both= {UserID, Username,Email}
    return Both
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
}
