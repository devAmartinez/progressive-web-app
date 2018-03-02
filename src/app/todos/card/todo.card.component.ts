import { 
	Component,
	OnInit,
	Input
} from '@angular/core';
import { ITodo } from '../../structures/todos';

@Component({
	selector: 'app-card',
	templateUrl: './todo.card.component.html'
})

export class CardComponent implements OnInit {

	@Input() todo : ITodo;

	constructor() {}

	ngOnInit() {}

}
