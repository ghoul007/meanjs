import { Router } from "@angular/router";
import { AuthService } from "./service/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  model: any = {};
  error: string = "";
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.model = {
      username: "Ahmed",
      password: "Secret"
    };
  }

  login() {
    console.log(this.model);
    this.auth.login(this.model.username, this.model.password).then(
      res => {
        // console.log("res", res);

        this.router.navigate(["/"]);
      },
      err => {
        console.log("error", err);
      }
    );
  }
}
