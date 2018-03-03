const CACHE_NAME = "what-todo-v1.0";
const cacheUrls = [
	"/",
	"/assets/offline.html"
];

// Instalación del service worker
self.addEventListener('install', function (ev) {
	caches.open(CACHE_NAME)
		.then(function (cache) {
			return cache.addAll(cacheUrls);
		});
});

// Activación del service worker
self.addEventListener('activate', function (ev) {
	const limpiarCache = caches.keys().then(function (names) {
		const limpiarCacheVieja = names.map((name) => {
			if (CACHE_NAME !== name) return caches.delete(name);
		})
	})

	ev.waitUntil(
		limpiarCache
	);
});

/* 
	Evento que captura todas las peticiones a la red y/o 
	locales(localhost, o de la aplicación en si, 
	que no necesariamente se debe descargar de la red)
*/

/*
  En este punto es donde ocurre la finalidad del service worker
  si en cacheUrls, dijera que guarde /bundle.js,
  el response validara si ya existe y dirá que hay,
  cuando valido que response exista, lo retorno, por ende
  estaría devolviendo un objeto con lo almacenado en caché,
  estipulado en cacheUrls, por otro lado, de no existir localmente
  irá a la red a buscar lo indicado en cacheUrls.
*/
self.addEventListener('fetch', function (ev) {
	const responsePromise = caches.match(ev.request)
		.then(function (response) {
			// aquí, de existir, está tomando lo local
			if (response) {
				return response;
			}

			// en este punto, irá a la red a buscar lo solicitado
			return fetch(ev.request);
		}).catch(err => {
			if (ev.request.mode == "navigate") {
				return caches.match("/assets/offline.html");
			}
		})

	ev.respondWith(responsePromise);
})