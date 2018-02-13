import { UserManagerSettings, UserManager, User } from 'oidc-client';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private _manager = new UserManager(getClientSettings());
  private _user: User = null;

  constructor() {
    this._manager.getUser().then(user => {
      this._user = user;
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

export function getClientSettings(): UserManagerSettings {
  return {
      authority: 'https://login.microsoftonline.com/136544d9-038e-4646-afff-10accb370679',
      client_id: '257b6c36-1168-4aac-be93-6f2cd81cec43',
      redirect_uri: 'http://localhost:4200/auth-callback',
      //redirect_uri: 'https://demoazureadconnectangular5.azurewebsites.net/auth-callback',
      post_logout_redirect_uri: 'http://localhost:4200/',
      //post_logout_redirect_uri: 'https://demoazureadconnectangular5.azurewebsites.net/',
      response_type:"id_token",
      scope:"openid profile groups",
      filterProtocolClaims: true,
      loadUserInfo: true,
      metadata: {
        issuer: "https://sts.windows.net/136544d9-038e-4646-afff-10accb370679/",
        authorization_endpoint: "https://login.microsoftonline.com/136544d9-038e-4646-afff-10accb370679/oauth2/authorize",
        token_endpoint: "https://login.microsoftonline.com/136544d9-038e-4646-afff-10accb370679/oauth2/token",
        //jwks_uri: "https://login.microsoftonline.com/common/discovery/keys",
        jwks_uri: "http://localhost:4200/assets/keys.json",
        //jwks_uri: "https://demoazureadconnectangular5.azurewebsites.net/assets/keys.json",
        //jwks_uri: "http://localhost:50586/api/keys",
        signingKeys: [{"ApiAccessKey": "NgixniZ0S1JHxo7GPEZYa38OBTxSA98AqJKDX5XqsJ8="}]
    }
  };
}
