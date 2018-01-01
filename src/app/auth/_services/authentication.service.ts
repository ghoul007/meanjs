import { User } from '../../login/model/User';
import { BehaviorSubject, Observable } from "rxjs/Rx";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { JwtHelper } from "angular2-jwt";
import { getToken, deleteToken } from "../../jwt/jwt.module";

@Injectable()
export class AuthenticationService {

 
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
      return new User(userJSON.email, userJSON.password, userJSON.username);
    }
  
    getUser() {
      return this.currentUser.asObservable();
    }
  
    setUser(user) {
      this.currentUser.next(user);
    }
  
    subscribe(username: string, password: string): Promise<User> {
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
  

// import { Injectable } from "@angular/core";
// import { Http, Response } from "@angular/http";
// import "rxjs/add/operator/map";

// @Injectable()
// export class AuthenticationService {

//   constructor(private http: Http) {
//   }

//   login(email: string, password: string) {
//     return this.http.post('/api/authenticate', JSON.stringify({ email: email, password: password }))
//       .map((response: Response) => {
//         // login successful if there's a jwt token in the response
//         let user = response.json();
//         if (user && user.token) {
//           // store user details and jwt token in local storage to keep user logged in between page refreshes
//           localStorage.setItem('currentUser', JSON.stringify(user));
//         }
//       });
//   }

//   logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('currentUser');
//   }
// }
