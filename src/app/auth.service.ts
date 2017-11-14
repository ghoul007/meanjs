import { Observable } from "rxjs/Rx";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  login(username: string, password: string): Promise<any> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        "/api/login",
        JSON.stringify({ username: username, password: password }),
        options
      )
      .map(res => res.json())
      .toPromise()
      .then(response => {
        // let token = response.json();
        // let user = this.decodeUserFromToken(token);
        // this.setUser(user);

        // let userJSON = response.json().data.attributes;
        // let user = new User(userJSON.firstName, userJSON.lastName, userJSON.email);
        // this.setUser(user);
        return response;
      })
      .catch(error => {
        let errorJSON = JSON.parse(error._body).errors[0];
        return Promise.reject(errorJSON);
      });
  }
}
