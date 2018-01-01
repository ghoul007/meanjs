import { AuthGuardService } from '../jwt/guard/auth-guard.service';
import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
 

const routes: Routes = [
  {
    'path': '',
    'component': ThemeComponent,
    'canActivate': [AuthGuardService],
    'children': [
      {
        'path': 'index',
        'loadChildren': '.\/pages\/default\/blank\/blank.module#BlankModule',
      },
      {
        'path': '',
        'redirectTo': 'index',
        'pathMatch': 'full',
      },
    ],
  },
  {
    'path': '**',
    'redirectTo': 'index',
    'pathMatch': 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuardService]
})
export class ThemeRoutingModule { }
