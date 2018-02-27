// Componentes propios
import { HomeComponent } from './home/home.component';

export const appRoutes = [
	{path: '', component: HomeComponent, pathMatch: 'full'},
	{path: '**', component: HomeComponent}
];
