import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/_guards/auth.guard';
 

const routes: Routes = [
  {
    'path': '',
    'component': ThemeComponent,
    'canActivate': [AuthGuard],
    'children': [
      {
        'path': 'index',
        'loadChildren': '.\/pages\/default\/blank\/blank.module#BlankModule',
      },
      {
        "path": "test",
        'loadChildren': '.\/pages\/default\/test\/test.module#TestModule',
      },
      {
        "path": "vms",
        'loadChildren': '.\/pages\/default\/vms\/vms.module#BaseDataAjaxModule',
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
  providers:[AuthGuard]
})
export class ThemeRoutingModule { }
