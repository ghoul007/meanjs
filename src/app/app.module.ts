import { JwtModule } from "./auth/helper/jwt.module";
import { AuthService } from "./cloudmatic/pages/login/service/auth.service";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, isDevMode } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./cloudmatic/pages/login/login.component";
import { HomeComponent } from "./cloudmatic/pages/home/home.component";
import { ICMStore, INIT_STATE, rootReducer } from "./root.reducer";
import { NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux';
import { AuthGuardService } from "./auth/guard/auth-guard.service";
import { NotFoundComponent } from "./cloudmatic/layouts/not-found/not-found.component";
import { LayoutModule } from "./cloudmatic/layouts/layout.module";
import { ThemeComponent } from "./cloudmatic/theme.component";
import { ThemeRoutingModule } from "./cloudmatic/theme-routing.module";
import { ScriptLoaderService } from "./_services/script-loader.service";

const ROOT = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  { path: "login", component: LoginComponent },
  { path: "post", loadChildren: "app/cloudmatic/pages/post/post.module#PostModule" },
  { path: "movie", loadChildren: "app/cloudmatic/pages/movie/movie.module#MovieModule" },
  { path: "bootstrap", loadChildren: "app/cloudmatic/pages/default/angular/ng-bootstrap/ng-bootstrap.module#NgBootstrapModule" },
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
    LayoutModule,
    // ThemeRoutingModule,
    BrowserModule,
    JwtModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    RouterModule.forRoot(ROOT)
  ],
  providers: [AuthService, AuthGuardService, ScriptLoaderService],
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
