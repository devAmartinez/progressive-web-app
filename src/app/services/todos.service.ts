import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { 
	AngularFirestore,
	AngularFirestoreCollection,
	DocumentChangeAction
} from 'angularfire2/firestore';
import { ITodo } from '../structures/todos';
import * as firebase from 'firebase/app';

@Injectable()

export class TodoService {
	private _collection : AngularFirestoreCollection<ITodo>;
	private _ref : Observable<DocumentChangeAction[]>;
	private _listId : string;

	constructor(
		private _afs : AngularFirestore
	) {}

	setCollection(listId : string) {
		this._listId = listId;
		this._collection = this._afs.collection('lists').doc(listId).collection('todos');

		this._ref = this._collection.snapshotChanges();
	}

	getFromList(listId : string) : Observable<ITodo[]> {
		if(!this._collection || this._listId != listId) this.setCollection(listId);

		return this._ref.map(actions => {
			return actions.map(item => {
				const data = item.payload.doc.data() as ITodo;
				const id = item.payload.doc.id;
				
				return {...data, id};
			});
		});
	}

	add(listId : string, todo : ITodo) : Promise<any> {
		if(!this._collection || this._listId != listId) this.setCollection(listId);

		const createdAt = firebase.firestore.FieldValue.serverTimestamp();

		todo.createdAt = createdAt;

		return this._collection.add(todo);
	}
}
