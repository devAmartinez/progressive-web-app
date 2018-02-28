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
	/*
		Creo la propiedad pública con una colección de la 
		interfaz Ilist para manipular y posteriormente almacenar
		los datos
	*/
	public listsCollection : AngularFirestoreCollection<Ilist>;
	/* 
	Creo la propiedad pública observable con la interfaz 
	Ilist para obtener los registros de la colección
	*/
	public lists : Observable<Ilist[]>;

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
		this.listsCollection = this._afs.collection('users')
														.doc(this.uid)
														.collection<Ilist>('lists');
		this.lists = this.listsCollection.snapshotChanges().map(actions => {
			return actions.map(item => {
				const data = item.payload.doc.data() as Ilist;
				const id = item.payload.doc.id;

				return { ... data, id };
			});
		});
	}

	add(list : Ilist) : Promise<any> {
		if (!this.listsCollection) throw Error('Asigna una colección antes de intentar añadir un nuevo documento');
		
		const createdAt = firebase.firestore.FieldValue.serverTimestamp();

		list.createdAt = createdAt;

		return this.listsCollection.add(list);
	}
}
