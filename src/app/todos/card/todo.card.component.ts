import { 
	Component,
	OnInit,
	Input
} from '@angular/core';
import { ITodo, TStatus } from '../../structures/todos';
import {
	trigger,
	state,
	style,
	transition,
	animate
} from '@angular/animations';
import { TodoService } from '../../services/todos.service';
import * as moment from 'moment';

moment.locale('es');

@Component({
	selector: 'app-card',
	templateUrl: './todo.card.component.html',
	animations: [
		trigger('statusAnimation', [
			state('0, void', style({
				transform: 'translateX(0)',
				opacity: 1
			})),
			state('1, void', style({
				transform: 'translateX(-100%)',
				opacity: 0
			})),
			transition('0 <=> 1', [
				animate(200, style({
					transform: 'translateX(0)',
					opacity: 1
				})),
				animate(200)
			])
		]),
		trigger('pressAnimation', [
			state('up, void', style({
				transform: 'translateX(0)'
			})),
			state('down', style({
				transform: 'translateX(-100px)'
			})),
			transition('up <=> down', [
				animate(100, style({
					transform: 'translateX(0)'
				})),
				animate(100)
			])
		])
	]
})

export class CardComponent implements OnInit {

	@Input() todo : ITodo;
	@Input() listId : string;

	public press : string;
	public moment : any = moment;

	constructor(
		private _todoService : TodoService
	) {
		this.press = 'up';
	}

	ngOnInit() {}

	completed() {
		this.todo.status = TStatus.Completed;
		setTimeout(() => {
			this._todoService.update(this.listId,this.todo),
			300
		});
		
	}

}
