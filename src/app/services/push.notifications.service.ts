import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';

import { IUser } from '../structures/users';
import { UserService } from './users.service';

@Injectable()

export class PushNotificationService {
	public messaging = firebase.messaging();

	// creador del observador para las notificaciones
	public subject : Subject<any>;
	public notification : Observable<any>;

	constructor(
		public _userService : UserService
	) {
		this.subject = new Subject();
		this.notification = this.subject.asObservable();
	}

	refreshToken() {
		this.messaging.onTokenRefresh(() => {
			this.messaging.getToken()
				.then((token) => {
					this._userService.addToken(token);
				});
		});
	}

	watchMessages() {
		this.messaging.onMessage((notification) => {
			// Informar al observador de cambios
			this.subject.next(notification);
		});
	}

	getSubscription() : Promise<any> {
		if (!navigator) return;

		/*
		  para obtener la suscripción de la service worker
		  busco entre las service worker activas la de mensajes
		  para posteriormente poder cancelar las notificaciones del sitio
		*/
		return navigator.serviceWorker.getRegistrations()
			.then((registrations) => {
				const firebaseSw = registrations.filter(sw => {
					return sw.active && sw.active.scriptURL.includes("firebase-messaging")
				});

				if (firebaseSw.length < 1) return Promise.resolve(null);

				return firebaseSw[0].pushManager.getSubscription();
			});
	}

	cancelPermission() : Promise<any> {
		const subscriptionPr = this.getSubscription();

		return subscriptionPr.then((pushSubscription : PushSubscription) => {
			if (!pushSubscription) return Promise.resolve(null);

			return pushSubscription.unsubscribe();
		});
	}

	requestPermission() : Promise<void> {
		return this.messaging.requestPermission()
			.then(() => {
				return this.messaging.getToken();
			}).then((token) => {
				return this._userService.addToken(token);
			});
			//.catch();
	}

}
