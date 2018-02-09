import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private _router:Router, private _authService: AuthService) { }

  ngOnInit() {
    this._authService.completeAuthentication();
    console.log(this._authService.isLoggedIn());
    console.log(this._authService.getUser());
    console.log(this._authService.getClaims());

    this._router.navigate(["/protected"]);

  }

}