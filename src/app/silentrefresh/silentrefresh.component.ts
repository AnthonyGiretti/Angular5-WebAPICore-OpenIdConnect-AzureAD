import { Component, OnInit } from '@angular/core';
import { UserManager } from 'oidc-client';
import { getClientSettings } from '../openIdConnectConfig';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-silentrefresh',
  templateUrl: './silentrefresh.component.html',
  styleUrls: ['./silentrefresh.component.css']
})
export class SilentRefreshComponent implements OnInit {

  
  constructor(private _authService:AuthService) {
    
  }

  ngOnInit() {
    this._authService.refreshCallBack();
  }


}