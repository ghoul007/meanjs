import { Component, OnInit } from '@angular/core';
import {ScriptLoaderService} from "../../../../../_services/script-loader.service";
// import {TestService} from "../../../../../_services/test.service";
import {Actor} from "./test";

@Component({
    selector: 'app-test',
    templateUrl: '/test.component.html',
    styles: []
})
export class TestComponent implements OnInit {
    actors: Actor[];
    constructor( ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }

}
