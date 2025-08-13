import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { loginRedirectGuard } from './auth.guard';
import { authRequiredGuard } from './auth-required.guard';

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [loginRedirectGuard] },
  { path: "home", component: HomeComponent, canActivate: [authRequiredGuard] },
  { path: "details/:id", component: DetailsComponent, canActivate: [authRequiredGuard] },
];
