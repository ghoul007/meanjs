import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../helpers';
import { ScriptLoaderService } from '../_services/script-loader.service';
import * as $ from "jquery";
declare let mApp: any;
declare let mUtil: any;
@Component({
selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
templateUrl: "./theme.component.html",
encapsulation: ViewEncapsulation.None,
})
export class ThemeComponent implements OnInit {


constructor(private _script: ScriptLoaderService, private _router: Router)  {

}
ngOnInit()  {
		this._script.load('body', 'assets/vendors/base/vendors.bundle.js','assets/demo/demo2/base/scripts.bundle.js')
			.then(result => {
				Helpers.setLoading(false);
			});
		this._router.events.subscribe((route) => {
			if (route instanceof NavigationStart) {
				(<any>mApp).scrollTop();
				Helpers.setLoading(true);
				// hide visible popover
				(<any>$('[data-toggle="m-popover"]')).popover('hide');
			}
			if (route instanceof NavigationEnd) {
				// init required js
				(<any>mApp).init();
				(<any>mUtil).init();
				Helpers.setLoading(false);
				// content m-wrapper animation
				let animation = 'm-animate-fade-in-up';
				$('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (e) {
					$('.m-wrapper').removeClass(animation);
				}).removeClass(animation).addClass(animation);
			}
		});
}

}
