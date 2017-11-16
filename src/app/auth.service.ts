import { User } from "./User";
import { BehaviorSubject, Observable } from "rxjs/Rx";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { JwtHelper } from "angular2-jwt";
import { getToken, deleteToken } from "./jwt/jwt.module";

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: Http) {
    var token = getToken();
    if (token) {
      this.setUser(this.decodeUser(token));
    }
  }

  private currentUser = new BehaviorSubject<User>(new User());

  decodeUser(token) {
    let userJSON = this.jwtHelper.decodeToken(token);
    return new User(userJSON.firstName, userJSON.lastName, userJSON.email);
  }

  getUser() {
    return this.currentUser.asObservable();
  }

  setUser(user) {
    this.currentUser.next(user);
  }

  login(username: string, password: string): Promise<User> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        "cm/login",
        JSON.stringify({ username: username, password: password }),
        options
      )
      .map(res => res.json())
      .toPromise()
      .then(response => {
        let token = response;
        let user = this.decodeUser(token);
        this.setUser(user);
        return response;
      })
      .catch(error => {
        let errorJSON = JSON.parse(error._body).errors[0];
        return Promise.reject(errorJSON);
      });
  }

  logout() {
    this.setUser(new User());
    deleteToken();
  }
}
