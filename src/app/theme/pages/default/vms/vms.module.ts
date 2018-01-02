import { DatatableRemoteAjaxDemo } from '../../../plugins/datatable/datatable.plugin';
import { MovieService } from '../../../../movie/service/movie.service';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { BaseDataAjaxComponent } from "./vms.component";
import { LayoutModule } from "../../../layouts/layout.module";
import { DefaultComponent } from "../default.component";

const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "",
        component: BaseDataAjaxComponent
      }
    ]
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule],
  exports: [RouterModule],
  providers: [DatatableRemoteAjaxDemo, MovieService],
  declarations: [BaseDataAjaxComponent]
})
export class BaseDataAjaxModule {}
