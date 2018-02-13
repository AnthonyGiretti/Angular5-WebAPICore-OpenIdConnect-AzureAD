import { UserManagerSettings, UserManager, User } from 'oidc-client';
import { Injectable } from '@angular/core';
import { getClientSettings } from '../openIdConnectConfig';

@Injectable()
export class AuthService {

  private _manager = new UserManager(getClientSettings());
  private _user: User = null;

  constructor() {
    this._manager.getUser().then(user => {
      this._user = user;
    });

    this._manager.events.addUserLoaded(user => {
      this._user = user;
    });

    this._manager.events.addSilentRenewError(() => {
      console.log("error SilentRenew");
    });
    
    this._manager.events.addAccessTokenExpiring(() => {
      console.log("access token expiring");
    });

    this._manager.events.addAccessTokenExpired(() => {
      console.log("access token expired");
    });

  }

  public isLoggedIn(): boolean {
    return this._user != null && !this._user.expired;
  }

  public getClaims(): any {
    return this._user.profile;
  }

  getUser(): any {
    return this._user;
  }

  getName(): any {
    return this._user.profile.name;
  }

  getAuthorizationHeaderValue(): string {
    return `${this._user.token_type} ${this._user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this._manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this._manager.signinRedirectCallback().then(user => {
        this._user = user;
    });

    
  }
}