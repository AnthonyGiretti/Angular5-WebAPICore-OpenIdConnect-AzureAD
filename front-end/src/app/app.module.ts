import { HttpModule } from '@angular/http';
import { Adal5HTTPService, Adal5Service } from 'adal-angular5';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProtectedComponent } from './protected/protected.component';
import { TokenInterceptor } from './http/customHttpInterceptor';

const routes: Routes = [
    {
        path: '',
        children: []
    },
    {
        path: 'protected',
        component: ProtectedComponent,
        canActivate: [AuthGuardService]
    },
    {
      path: 'auth-callback',
      component: AuthCallbackComponent
    }
];

@NgModule({
  declarations: [
    AppComponent,
    ProtectedComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [HttpClient, AuthGuardService, AuthService, Adal5Service,{ provide: Adal5HTTPService, useFactory: Adal5HTTPService.factory, deps: [HttpClient, Adal5Service] },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
