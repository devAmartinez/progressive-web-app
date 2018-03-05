import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { PushNotificationService } from '../services/push.notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent {
	public token : boolean;

	constructor(
		private _router : Router,
		public afAuth : AngularFireAuth,
		public pushService : PushNotificationService
	) {
		this.token = false;
	}

	requestPushPermision() {
		this.pushService.requestPermission();
	}

	rejectPushPermision() {
		
	}

	logout() {
		this.afAuth.auth.signOut()
			.then(() => {
				this._router.navigate(['/login']);
			});
	}
}
