import { Injectable } from '@angular/core';
import { IUser } from '../structures/users';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()

export class UserService {

	private _users : AngularFirestoreCollection<IUser>;

	constructor(
		private _afs : AngularFirestore
	) {
		this._users = _afs.collection<IUser>('users');
	}

	add(user : IUser) : Promise<void> {
		return this._users.doc(user.uid)
			.set(user)
			.catch(console.log);
	}
}