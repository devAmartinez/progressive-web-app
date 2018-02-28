import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import {
	AngularFirestore,
	AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Ilist } from '../structures/lists';
import * as firebase from 'firebase/app';

@Injectable()

export class ListService {
	public uid : string;
	public lists : AngularFirestoreCollection<Ilist>;

	constructor(
		private _afs : AngularFirestore,
		private _auth : AuthService
	) {
		this._auth.getUser().subscribe(user => {
			this.uid = user.uid;

			if (this.uid) this.setCollection();
		});
	}


	setCollection() {
		this.lists = this._afs.collection('users')
									.doc(this.uid)
									.collection<Ilist>('lists');
	}

	add(list : Ilist) : Promise<any> {
		if (!this.lists) throw Error('Asigna una colección antes de intentar añadir un nuevo documento');
		
		const createdAt = firebase.firestore.FieldValue.serverTimestamp();

		list.createdAt = createdAt;

		return this.lists.add(list);
	}
}
