import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class ConectivityService extends HttpService {
  organizationRepos$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  totalRecords$: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Disconnects a user by sending a delete request with the access token
   * @param accessToken The user's access token
   * @returns An Observable of the server response
   */
  disconnectUser(accessToken: string): Observable<any> {
    return this.delete(`oauth/user?accessToken=${accessToken}`);
  }

  /**
   * Sends a POST request to the OAuth callback endpoint
   * @param data The data to be sent in the request body
   * @returns An Observable of the server response
   */
  getCallBack(data: any): Observable<any> {
    return this.post('oauth/callback', data);
  }

  /**
   * Sends a POST request to the OAuth callback endpoint
   * @param data The data to be sent in the request body
   * @returns An Observable of the server response
   */
  getOrganizations(data: any): Observable<any> {
    return this.post('oauth/organizations', data);
  }

  /**
   * Sends a POST request to the OAuth callback endpoint
   * @param data The data to be sent in the request body
   * @returns An Observable of the server response
   */
  getOrganizationRepos(data: any): Observable<any> {
    return this.post('oauth/organizations/repos', data);
  }
  /**
   * Sends a POST request to the OAuth callback endpoint
   * @param data The data to be sent in the request body
   * @returns An Observable of the server response
   */
  getOrganizationReposPullRequests(data: any): Observable<any> {
    return this.post('oauth/organizations/repos-pull-requests', data);
  }
  /**
   * Sends a POST request to the OAuth callback endpoint
   * @param data The data to be sent in the request body
   * @returns An Observable of the server response
   */
  getOrganizationReposIssues(data: any): Observable<any> {
    return this.post('oauth/organizations/repos-issues', data);
  }
  /**
   * Sends a POST request to the OAuth callback endpoint
   * @param data The data to be sent in the request body
   * @returns An Observable of the server response
   */
  getOrganizationReposCommits(data: any): Observable<any> {
    return this.post('oauth/organizations/repos-commits', data);
  }
}
