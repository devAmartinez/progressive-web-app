import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import * as firebase from 'firebase/app';
import { IUser } from '../structures/users';
import { UserService } from './users.service';

@Injectable()

export class AuthService {

	constructor(
		private _afAut: AngularFireAuth,
		private _userService : UserService 
	) {	}

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

	login() : Promise<void> {
		return this._afAut.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then(result => {
				return this._userService
					.add(
						{
							uid : result.user.uid, 
							email : result.user.email
						}
					);
			}).catch(console.log);
	}
}