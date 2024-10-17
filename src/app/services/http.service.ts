import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  /**
   * Base URL for API requests.
   */
  private readonly baseUrl = environment.baseUrl;

  /**
   * Constructor for HttpService.
   * @param httpClient The Angular HttpClient for making HTTP requests.
   */
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Sends a POST request to the specified URL.
   * @param url The endpoint URL.
   * @param data The data to be sent in the request body.
   * @returns An Observable of the response.
   */
  protected post<T>(url: string, data: any): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}/${url}`, data);
  }

  /**
   * Sends a DELETE request to the specified URL.
   * @param url The endpoint URL.
   * @returns An Observable of the response.
   */
  protected delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}/${url}`);
  }
}
