import { DatatableRemoteAjaxDemo } from "../../../plugins/datatable/datatable.plugin";
import { MovieService } from "../../../../movie/service/movie.service";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit
} from "@angular/core";
import { ScriptLoaderService } from "../../../../_services/script-loader.service";
declare var $: any;

@Component({
  selector: "app-base-data-ajax",
  templateUrl: "./vms.component.html",
  encapsulation: ViewEncapsulation.None
})
export class BaseDataAjaxComponent implements OnInit, AfterViewInit {
  columns: any = [
    {
      field: "id",
      title: "#",
      width: 50,
      sortable: false,
      textAlign: "center",
      selector: {
        class: "m-checkbox--solid m-checkbox--brand"
      }
    },
    {
      field: "name",
      title: "Name"
    },
    {
      field: "description",
      title: "description"
    }
  ];

  searchOption = {
    searchField: "generalSearch",
    searchList: [{ field: "name", html:"m_form_type" }, { field: "description", html:"m_form_status"  }]
  };

  constructor(
    private _script: ScriptLoaderService,
    private table: DatatableRemoteAjaxDemo,
    private movieService: MovieService
  ) {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.movieService.getMovies().subscribe(res => {
      this.table.config(res, this.columns, this.searchOption);
    });
    // this._script.loadScripts('app-base-data-ajax',
    // ['assets/demo/default/custom/components/datatables/base/data-ajax.js']);
  }
}
