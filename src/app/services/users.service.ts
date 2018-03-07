import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { IUser } from '../structures/users';
import { AuthService } from './auth.service';

@Injectable()

export class UserService {

	private _users : AngularFirestoreCollection<IUser>;

	constructor(
		private _afs : AngularFirestore,
		private _afAut: AngularFireAuth
	) {
		this._users = _afs.collection<IUser>('users');
	}

	getUser() : Observable<IUser> {
		// Usar take me garantiza que solo llegará 1 usuario
		// filter indica que solo tomara
		return this._afAut.authState
			.take(1)
			.filter(user => !!user)
			.map((user : firebase.User) => {
				return user as IUser;
			});
	}

	add(user : IUser) : Promise<void> {
		return this._users.doc(user.uid)
			.set(user)
			.catch(console.log);
	}

	addToken(token : string) : Promise<any> {
		return new Promise((res, rej) => {
			this.getUser()
				.subscribe((user) => {
					this.saveToken(user, token)
						.then(res)
						.catch(rej);
				});
		});		
	}

	saveToken(user : IUser, token : string) : Promise<any> {
		// Tomar los tokens del usuario
		let tokens = user.tokens || {};

		// Validar si el usuario ya tenía el token
		if (tokens[token]) return Promise.resolve(null);

		tokens[token] = true;

		return this._users.doc(user.uid).update({
			tokens: tokens
		});
	}
}