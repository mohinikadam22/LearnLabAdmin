import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  
  addVideoToWatchlist(userId: string, courseId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}/watchlist`;
    const body = { courseId };
    return this.http.post(url, body);
  }

  getWatchlist(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}/watchlist`;
    return this.http.get(url);
  }

  deleteVideoFromWatchlist(userId: string, courseId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}/watchlist/${courseId}`;
    return this.http.delete(url);
  }
}
