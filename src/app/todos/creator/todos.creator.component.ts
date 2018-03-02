import { 
	Component,
	OnInit,
	Input 
} from '@angular/core';
import { 
  Validators,
  FormControl,
  FormGroup 
} from '@angular/forms';
import { TodoService } from '../../services/todos.service';
import { ITodo, TStatus } from '../../structures/todos';
import { 
	trigger,
	state,
	style,
	transition,
	animate
} from '@angular/animations';

@Component({
	selector: 'app-creator',
	templateUrl: './todos.creator.component.html',
	animations: [
		trigger('openClose', [
			state('collapsed, void', style({height:'0px'})),
			state('expanded', style({height:'*'})),
			transition('collapsed <=> expanded',[animate(300,style({height:'*'})), animate(300)])
		])
	]
})

export class TodosCreatorComponent implements OnInit {
	
	@Input() listId : string;
	
	public todosForm : FormGroup;
	public formState : string;
	
	public todo : ITodo = { 
		whatTodo: '',
		detail: '',
		status: TStatus.Created
	};

	constructor(
		private _todoService : TodoService
	) {
		this.formState  = 'collapsed';
	}

	ngOnInit() {
		this.todosForm = new FormGroup ({
			whatTodo : new FormControl('', [Validators.required, Validators.minLength(3)]),
			detail : new FormControl('')
		});
	}

	save() : void {
		this.todo.whatTodo = this.todosForm.value['whatTodo'];
		this.todo.detail = this.todosForm.value['detail'];
		this._todoService.add(this.listId, this.todo);
	}

	label() : string {
		return (this.formState == 'collapsed' ? 'Agregar nuevo pendiente' : 'Ocultar formulario');
	}

	icon() : string {
		return (this.formState == 'collapsed' ? 'fa-plus' : 'fa-caret-up');
	}

	togleForm() : void {
		this.formState = (this.formState == 'collapsed' ? 'expanded' : 'collapsed');
	}
}
