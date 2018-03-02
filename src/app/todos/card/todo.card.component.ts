import { 
	Component,
	OnInit,
	Input
} from '@angular/core';
import { ITodo } from '../../structures/todos';
import {
	trigger,
	state,
	style,
	transition,
	animate
} from '@angular/animations';

@Component({
	selector: 'app-card',
	templateUrl: './todo.card.component.html',
	animations: [
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
	public press : string;

	constructor() {
		this.press = 'up';
	}

	ngOnInit() {}

	completed() {
		console.log('swiped');
	}

}
