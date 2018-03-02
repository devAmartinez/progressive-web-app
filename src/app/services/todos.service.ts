import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { 
	AngularFirestore,
	AngularFirestoreCollection
} from 'angularfire2/firestore';
import { ITodo } from '../structures/todos';
import * as firebase from 'firebase/app';

@Injectable()

export class TodoService {
	private _collection : AngularFirestoreCollection<ITodo>;
	private _listId : string;

	constructor(
		private _afs : AngularFirestore
	) {}

	setCollection(listId : string) {
		this._listId = listId;
		this._collection = this._afs.collection('lists').doc(listId).collection('todos');
	}

	add(listId : string, todo : ITodo) : Promise<any> {
		if(!this._collection || this._listId != listId) this.setCollection(listId);

		const createdAt = firebase.firestore.FieldValue.serverTimestamp();

		todo.createdAt = createdAt;

		return this._collection.add(todo);
	}
}
