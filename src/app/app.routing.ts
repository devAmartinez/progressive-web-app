// Componentes propios
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/auth.guard.service';

export const appRoutes = [
	{path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuardService]},
	{path: 'login', component: LoginComponent},
	{path: '**', component: HomeComponent}
];
