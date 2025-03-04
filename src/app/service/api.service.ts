import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Category API methods
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`/categories`);
  }

  // Product API methods
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`/products`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(`/products`, productData);
  }
}