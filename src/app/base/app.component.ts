import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent {
	constructor(
		private _router : Router,
		public afAuth : AngularFireAuth
	) {}

	logout() {
		this.afAuth.auth.signOut()
			.then(() => {
				this._router.navigate(['/login']);
			});
	}
}
