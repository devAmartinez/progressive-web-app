import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()

export class PushNotificationService {
	public messaging =firebase.messaging();

	requestPermission() : Promise<void> {
		return this.messaging.requestPermission();
			//.then()
			//.catch();
	}

}
