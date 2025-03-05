import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  // Category API methods
  getCategories(page: number = 1, { perPage }: { perPage: number } = { perPage: 20 }): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    params.set('per_page', perPage.toString());
    return this.http.get<any>(`/categories`, { params });
  }

  // Product API methods
  getProducts(page: number = 1, { perPage }: { perPage: number } = { perPage: 20 }): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    params.set('per_page', perPage.toString());
    return this.http.get<any>(`/products`, { params });
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(`/products`, productData);
  }
}