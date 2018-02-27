// Componentes propios
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const appRoutes = [
	{path: '', component: HomeComponent, pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: '**', component: HomeComponent}
];
