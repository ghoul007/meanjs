import { Http, RequestOptions, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  constructor(private _http: Http) { }

  getPosts() {

    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    return this._http.post("/api/list_resource",
      JSON.stringify({ resource: 'post' }), options).map(res =>
        res.json());
    // return this._http.get("/api/posts").map(res => res.json());
  }
}
