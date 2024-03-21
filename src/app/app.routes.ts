import { Routes, mapToCanActivate } from "@angular/router";
import AboutComponent from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./shared/auth.guard";

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
        canActivate: mapToCanActivate([AuthGuard]),
        loadChildren: () => import('./booking/index').then(m => m.FLIGHT_BOOKING_ROUTES)
    },
    {
        path: 'about',
        component: AboutComponent
    },
];
