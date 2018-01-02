import { JwtHelper } from "angular2-jwt";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs/Rx";
import { getToken } from "../../jwt/jwt.module";

@Injectable()
export class AuthGuard implements CanActivate {
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private _router: Router, private _userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    let token = getToken();
 
    if (token) {
      return true;
    } else {
      this._router.navigate(["/login"], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
  }
}
