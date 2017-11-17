import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MovieService {
  constructor(private _http: Http) {}

  getMovies() {
   return  this._http.get("/api/movies").map(res => res.json());
  }
}
