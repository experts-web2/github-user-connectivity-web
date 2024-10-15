import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  protected baseUrl = `http://localhost:3000/api`;
  constructor(private readonly httpClient: HttpClient) {}

  protected post(url: string, data: any, headers?: HttpHeaders | {}): Observable<any> {
    return this.httpClient.post(this.baseUrl + `/${url}`, data, {headers});
  }

  protected get(url: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + `/${url}`);
  }

  protected put(url: string, data: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + `/${url}`, data);
  }

  protected patch(url: string, data: any): Observable<any> {
    return this.httpClient.patch(this.baseUrl + `/${url}`, data);
  }

  protected delete(url: string): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `/${url}`);
  }
}
