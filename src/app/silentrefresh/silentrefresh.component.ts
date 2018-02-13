import { Component, OnInit } from '@angular/core';
import { UserManager } from 'oidc-client';
import { getClientSettings } from '../openIdConnectConfig';

@Component({
  selector: 'app-silentrefresh',
  templateUrl: './silentrefresh.component.html',
  styleUrls: ['./silentrefresh.component.css']
})
export class SilentRefreshComponent implements OnInit {

  private _manager = new UserManager(getClientSettings());

  constructor() {
  }

  ngOnInit() {
    
  }

  public refresh(): void
  {
    console.log("start refresh");
    this._manager.signinSilentCallback()
      .then(data => {console.log(data)})
      .catch((err) => {
          console.log(err);
      });
      console.log("end refresh");
  }

}
