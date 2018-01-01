import { getToken } from "../../jwt/jwt.module";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MovieService {
  constructor(private _http: Http) { }

  // getMovies() {
  //  return  this._http.get("/api/movies").map(res => res.json());
  // }

  getMovies() {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(
      "/api/list_resource",
      JSON.stringify({ resource: "movie" }),
      options
      )
      .map(res => res.json());
  }

  addMovies(name) {
    console.log(getToken());
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken()
    });
    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(
      "/api/create_resource",
      JSON.stringify({
        resource: "movie",
        data: { name: name, description: "test" }
      }),
      options
      )
      .map(res => res.json());
  }

  deleteMovies(movie) {
    console.log(getToken());
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken()
    });
    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(
      "/api/delete_resource",
      JSON.stringify({ resource: "movie", uuid: movie.id }),
      options
      )
      .map(res => res.json());
  }
}
