import { Adal5HTTPService, Adal5Service } from 'adal-angular5';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private _user = null;
  private _config = {
    tenant: '136544d9-038e-4646-afff-10accb370679',
    clientId: '257b6c36-1168-4aac-be93-6f2cd81cec43',
    redirectUri: "http://localhost:4200/auth-callback",
    postLogoutRedirectUri: "http://localhost:4200"
  }

  constructor(private _adal: Adal5Service) {
    this._adal.init(this._config);

    if (this.isLoggedIn()) {
      console.log(`Rechargement de la page, c'est le meme token et il expire dans ${this._expireIn()} secondes`);
    }
  }

  public isLoggedIn(): boolean {
    return this._adal.userInfo && this._adal.userInfo.authenticated;
  }
  
  public signOut(): void {
    this._adal.logOut();
  }

  public startAuthentication(): any {
    this._adal.login();
  }

  public getName(): string {
    return this._adal.userInfo.profile.name;
  }

  public getToken(): string {
    return this._adal.userInfo.token;
  }

  public completeAuthentication(): void {
    this._adal.handleWindowCallback();
    console.log(`Authentification OK et le token expire dans ${this._expireIn()} secondes`);
  }

  private _expireIn(): number {
    return Math.round(this._adal.userInfo.profile.exp - new Date().getTime() / 1000);
  }
}