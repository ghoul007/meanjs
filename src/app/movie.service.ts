import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MovieService {
  constructor(private _http: Http) {}

  // getMovies() {
  //  return  this._http.get("/api/movies").map(res => res.json());
  // }

  getMovies() {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

   return  this._http.post("/api/list_resource",
   JSON.stringify({ resource: 'movie' }), options).map(res =>
    res.json());
  }
}
