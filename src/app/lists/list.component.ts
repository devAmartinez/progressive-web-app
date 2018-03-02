import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html'
})

export class ListComponent implements OnInit {
	public listId : string;

	constructor(
		private _route : ActivatedRoute
	) {}

	ngOnInit() {
		this.listId = this._route.snapshot.params.id;
	}

}
