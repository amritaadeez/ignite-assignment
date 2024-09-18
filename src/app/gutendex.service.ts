import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GutendexService {
  private baseUrl = 'http://skunkworks.ignitesol.com:8000/books';

  constructor(private http: HttpClient) {}

  getBooksByCategory(category: string, page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('topic', category)
      .set('page', page.toString())
      .set('mime_type', 'image/jpeg');

    return this.http.get<any>(this.baseUrl, { params });
  }

  searchBooks(query: string, category: string, page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('search', query)
      .set('topic', category)
      .set('page', page.toString())
      .set('mime_type', 'image/jpeg'); 

    return this.http.get<any>(this.baseUrl, { params });
  }
}
