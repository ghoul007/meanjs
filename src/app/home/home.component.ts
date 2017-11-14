import { AuthService } from "../auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
   currentUser :any={};
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getUser().subscribe(res => {
      this.currentUser = res;
    });
  }
}
