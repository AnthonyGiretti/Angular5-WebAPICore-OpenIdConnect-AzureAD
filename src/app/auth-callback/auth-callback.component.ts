import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private _router:Router, private _authService: AuthService, private _zone: NgZone) { }

  ngOnInit() {
    this._authService.completeAuthentication().then(() => {
      this._zone.run(
        () => this._router.navigate(['/protected'])
      );
    });
  }

}