import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {

  name: String = "";
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.name = this._authService.getName();
  }

  public signout(): void {
    this._authService.signout();
  }
}