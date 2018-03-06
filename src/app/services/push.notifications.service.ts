import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()

export class PushNotificationService {
	public messaging = firebase.messaging();

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
			})
			//.catch();
	}

}
