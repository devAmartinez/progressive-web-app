import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  	.then(() => {
  		/*
  		  Al parecer la service worker de firebase para las notificaciones
				tiene conflictos con la service worker de angular
				para solucionarlo, una vez la aplicación se registre en el navegador
				y la aplicación se encuentre en modo producción,se
				procede a registrar la service worker de angular
  		*/
  		if ('serviceWorker' in navigator && environment.production) {
  			navigator.serviceWorker.register('/ngsw-worker.js');
  		}
  	});
});
