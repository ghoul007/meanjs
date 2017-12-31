import { Router } from '@angular/router';
import { AuthService } from '../../login/service/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService {
  constructor(private authService_: AuthService, private router_: Router) {}
  public canActivate(): Observable<boolean> {
    return this.authService_.getUser()
      .map(loginIn => {
        console.log(loginIn);
        if (!loginIn.username) {
          this.router_.navigate(["login"]);
        } else {
          return true;
        }
      })
      .take(1);
  }

}
