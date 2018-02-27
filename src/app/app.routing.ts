// Componentes propios
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListCreatorComponent } from './lists/creator/list.creator.component';
import { AuthGuardService } from './guards/auth.guard.service';

export const appRoutes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full',
		canActivate: [AuthGuardService]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'new',
		component: ListCreatorComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: '**',
		component: HomeComponent
	}
];
