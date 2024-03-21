import { Routes, mapToCanActivate } from "@angular/router";
import AboutComponent from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { inject } from "@angular/core";
import { AuthService } from "./shared/auth.service";

export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'flight-booking',
        canActivate: [() => inject(AuthService).isAuthenticated() ],
        loadChildren: () => import('./booking/index')
    },
    {
        path: 'about',
        component: AboutComponent
    },
];
