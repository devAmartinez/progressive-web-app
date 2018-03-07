import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { PushNotificationService } from '../services/push.notifications.service';
import { IUser } from '../structures/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent implements OnInit{
	public token : any;
	public showPanel : boolean;

	constructor(
		private _router : Router,
		public afAuth : AngularFireAuth,
		public pushService : PushNotificationService
	) {}

	ngOnInit() {
		this.token = this.pushService.getSubscription();
		this.pushService.watchMessages();
		this.pushService.refreshToken();
	}

	requestPushPermision() {
		this.pushService.requestPermission()
			.then(() => {
				this.token = this.pushService.getSubscription();
				this.toggleNotificationWindow();
			});
	}

	cancelPushPermision() {
		this.pushService.cancelPermission()
			.then(() => {
				this.token = this.pushService.getSubscription();
				this.toggleNotificationWindow();
			});
	}

	toggleNotificationWindow() {
		this.showPanel = !this.showPanel;
	}

	logout() {
		this.afAuth.auth.signOut()
			.then(() => {
				this._router.navigate(['/login']);
			});
	}
}
