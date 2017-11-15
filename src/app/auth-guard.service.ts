import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService {
  constructor(private authService_: AuthService, private router_: Router) {}
    public canActivate() : Observable<any> {
      return this.authService_.getUser().map(res => res.username)
      .take(1)
        // .subscribe(loginIn => {
        //   console.log(loginIn);
        //   if (loginIn.username) {
        //     return true;
        //   } else {
        //     this.router_.navigate(["login"]);
        //   }
        // }
      // ) 
    }

}
