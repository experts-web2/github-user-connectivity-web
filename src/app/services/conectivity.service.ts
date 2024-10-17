import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class ConectivityService extends HttpService {
  // GitHub OAuth client ID
  private readonly CLIENT_ID = 'Ov23liEfxzi01DRu0sXZ';
  // GitHub OAuth authorization URL
  private readonly GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';

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
   * Initiates the GitHub OAuth login process
   * Generates a random state for CSRF protection and redirects to GitHub's authorization page
   */
  loginWithGitHub(): void {
    // Generate a random state for CSRF protection
    const state = crypto.lib.WordArray.random(16).toString();
    localStorage.setItem('latestCSRFToken', state);

    // Prepare the URL parameters for the GitHub OAuth request
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      response_type: 'code',
      scope: 'repo',
      redirect_uri: `${window.location.origin}/connectivity`,
      state: state,
    });

    // Redirect to GitHub's authorization page
    window.location.href = `${this.GITHUB_AUTH_URL}?${params.toString()}`;
  }
}
