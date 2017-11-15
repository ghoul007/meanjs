import { JwtModule } from './jwt/jwt.module';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { PostService } from "./post.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { PostComponent } from "./post/post.component";

const ROOT = [
  { path: "", redirectTo:"home", pathMatch:'full' },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "post", component: PostComponent }
];
@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, PostComponent],
  imports: [BrowserModule, JwtModule, FormsModule, HttpModule, RouterModule.forRoot(ROOT) ],
  providers: [PostService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
