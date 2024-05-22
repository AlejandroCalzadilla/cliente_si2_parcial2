import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { PrincipalComponent } from './admin/principal/principal.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [

    { path:'', component:HomeComponent}, 
    //{ path:'user', component:UsersComponent},
    {path: 'login',component:LoginComponent},
    {path: 'dashboard',component:PrincipalComponent},
    {path: 'register',component:RegisterComponent},
];
