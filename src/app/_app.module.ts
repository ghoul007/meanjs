import { ThemeComponent } from './theme/theme.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './theme/layouts/layout.module';
import { JwtModule } from "./jwt/jwt.module";
import { AuthService } from "./login/service/auth.service";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, isDevMode } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuardService } from "./jwt/guard/auth-guard.service";
import { ICMStore, INIT_STATE, rootReducer } from "./root.reducer";
import { NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux';
import { ThemeRoutingModule } from './theme/theme-routing.module';
import { ScriptLoaderService } from './_services/script-loader.service';


const ROOT = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  { path: "login", component: LoginComponent },
  { path: "post", loadChildren: "app/post/post.module#PostModule", canActivate: [AuthGuardService] },
  { path: "movie", loadChildren: "app/movie/movie.module#MovieModule", canActivate: [AuthGuardService] },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  declarations: [
    ThemeComponent,
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    JwtModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    // RouterModule.forRoot(ROOT),
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeRoutingModule,
    AuthModule,
  ],
  providers: [ScriptLoaderService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<ICMStore>,
    private dev: DevToolsExtension
  ) {
    let enhancer = isDevMode() ? [dev.enhancer()] : [];
    this.ngRedux.configureStore(rootReducer, INIT_STATE, [], enhancer);
  }
}
