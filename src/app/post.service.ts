import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  constructor(private _http: Http) {}

  getPosts() {
    return this._http.get("/api/posts").map(res => res.json());
  }
}
