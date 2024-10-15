import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class ConectivityService extends HttpService {

  constructor(private readonly http: HttpClient) { super(http) }

  disconectUser(accessToken: string){
    return this.delete(`oauth/user?accessToken=${accessToken}`);
  }

  getCallBack(data: any): Observable<any>{
    return this.post(`oauth/callback`, data);
  }

  loginWithGitHub(){
    const client_id = "Ov23liEfxzi01DRu0sXZ"
    const state = crypto.lib.WordArray.random(16).toString();
    localStorage.setItem("latestCSRFToken", state);
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&response_type=code&scope=repo&redirect_uri=${window.location.origin}/connectivity&state=${state}`;
    window.location.href = githubAuthUrl;
  }
}
