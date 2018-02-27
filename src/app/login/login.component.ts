import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

	constructor(
		private _router : Router,
		private _auth: AuthService
	) {	}

	ngOnInit() {
		this._auth.getUser().subscribe(console.log);
	}

	login() {
		this._auth.login()
			.then(() => {
				this._router.navigate(['/']);
			});
	}
}
