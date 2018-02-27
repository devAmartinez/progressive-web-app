import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes propios
import { HomeComponent } from './home/home.component';


const appRoutes = [
	{path: '', component: HomeComponent, pathMatch: 'full'},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);