import { Injectable } from '@angular/core';
import { 
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()

export class AuthGuardService implements CanActivate{
	
	constructor(
		private _afAuth : AngularFireAuth,
		private _router : Router
	) {}

	canActivate(
		route : ActivatedRouteSnapshot, 
		state : RouterStateSnapshot
	) : Observable<boolean> {
		return this._afAuth.authState
			.take(1)
			.map((user : firebase.User) => {
				return !!user;
			}).do((authenticated : boolean ) => {
				if (!authenticated) this._router.navigate(['/login']);
			});
	}


}