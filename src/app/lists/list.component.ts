import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITodo } from '../structures/todos';
import { Observable } from 'rxjs/Rx';
import { TodoService } from '../services/todos.service';
import { enterAnimation } from '../animations/animations';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
  animations: [enterAnimation]
})

export class ListComponent implements OnInit {
	
	public listId : string;
	public todos : Observable<ITodo[]>;


	constructor(
		private _route : ActivatedRoute,
		private _todoService : TodoService
	) {}

	ngOnInit() {
		this.listId = this._route.snapshot.params.id;

		this.todos = this._todoService.getFromList(this.listId);
	}

}
