import { Component, OnInit } from '@angular/core';
import { Ilist } from '../../structures/lists';
import { ListService } from '../../services/lists.service';

@Component({
	selector: 'app-list-creator',
	templateUrl: './list.creator.component.html'
})

export class ListCreatorComponent implements OnInit {

	public list : Ilist = { title: '' };

	constructor(
		private _listService : ListService
	) {}

	ngOnInit() {}

	save() {
		this._listService.add(this.list)
			.then((result) => {
				this.list.title = '';
			}
		);
	}
}
