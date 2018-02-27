import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

	constructor(
		private _auth: AuthService
	) {	}

	ngOnInit() {

	}

	login() {
		console.log()
	}
}
