importScripts('https://www.gstatic.com/firebasejs/4.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.9.0/firebase-messaging.js');

firebase.initializeApp({
	/*
		este id se toma de firebase de la sección
	  Project overview >> Agregar Firebase a tu app web  
	*/
	'messagingSenderId': "498802918253"
});

const messaging = firebase.messaging();