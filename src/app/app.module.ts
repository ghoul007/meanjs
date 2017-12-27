import { AuthGuardService } from './auth-guard.service';
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
import { MovieComponent } from './movie/movie.component';
import {MovieService} from './movie.service';
import { NotFoundComponent } from './not-found/not-found.component';

const ROOT = [
  { path: "", redirectTo:"home", pathMatch:'full' },
  { path: "home", component: HomeComponent,  canActivate: [AuthGuardService] },
  { path: "login", component: LoginComponent },
  { path: "post", component: PostComponent,  canActivate: [AuthGuardService]  },
  { path: "movie", component: MovieComponent,  canActivate: [AuthGuardService]  },
  { path: "**", component: NotFoundComponent  }
];
@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, PostComponent, MovieComponent, NotFoundComponent],
  imports: [BrowserModule, JwtModule, FormsModule, HttpModule, RouterModule.forRoot(ROOT) ],
  providers: [PostService,AuthService , AuthGuardService, MovieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
