import { Injectable } from '@angular/core';
import { Adal5Service, Adal5HTTPService } from 'adal-angular5';
import { adal } from 'adal-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const config: adal.Config = {
  tenant: '136544d9-038e-4646-afff-10accb370679',
  clientId: '257b6c36-1168-4aac-be93-6f2cd81cec43',
  redirectUri: "http://localhost:4200/auth-callback",
  postLogoutRedirectUri: "http://localhost:4200"
}

@Injectable()
export class AuthService {

  private _user = null;

  constructor(private _adal: Adal5Service) {
    this._adal.init(config);
  }

  public isLoggedIn(): boolean {
    return this._adal.userInfo.authenticated;
  }
  
  signout(): any {
    this._adal.logOut();
  }

  startAuthentication(): any {
    this._adal.login();
  }

  getName(): string {

    return this._user.profile.name;
  }



  completeAuthentication(): any {
    this._adal.handleWindowCallback();
    return this._adal.getUser().subscribe(user => {
      this._user = user;
      console.log(this._adal.userInfo.token);
      var expireIn = user.profile.exp - new Date().getTime();

      //autologout after a certain time, because unable to manage refresh token
      //setTimeout(() => {this.signout()},5000);

    });
  }
}