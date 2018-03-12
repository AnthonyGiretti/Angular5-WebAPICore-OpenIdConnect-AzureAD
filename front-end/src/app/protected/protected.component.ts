import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {

  name: String = "";
  data: String = "";
  constructor(private _authService: AuthService, private _http: HttpClient) { }

  ngOnInit() {
    this.name = this._authService.getName();
    this._http.get<any>("http://localhost:50586/api/values").subscribe(res => this.data =  res.text);
  }

  public signout(): void {
    this._authService.signOut();
  }
}