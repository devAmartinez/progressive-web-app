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

@Component({
	selector: 'app-creator',
	templateUrl: './todos.creator.component.html'
})

export class TodosCreatorComponent implements OnInit {
	
	@Input() id : string;
	
	public todosForm : FormGroup;
	
	public todo : ITodo = { 
		whatTodo: '',
		detail: '',
		status: TStatus.Created
	};

	constructor(
		private _todoService : TodoService
	) {}

	ngOnInit() {
		this.todosForm = new FormGroup ({
			whatTodo : new FormControl('', [Validators.required, Validators.minLength(3)]),
			detail : new FormControl('')
		});
	}

	save() {
		this.todo.whatTodo = this.todosForm.value['whatTodo'];
		this.todo.detail = this.todosForm.value['detail'];
		this._todoService.add(this.id, this.todo);
	}
}
