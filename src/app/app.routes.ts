import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { PrincipalComponent } from './admin/principal/principal.component';
import { RegisterComponent } from './auth/register/register.component';
import { FacultadIndexComponent } from './admin/facultad/index/facultadIndex.component';
import { FacultadShowComponent } from './admin/facultad/show/facultadShow.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { DocenteIndexComponent } from './admin/docente/docente-index/docente-index.component';
import { DocenteCreateComponent } from './admin/docente/docente-create/docente-create.component';
import { DocenteEditComponent } from './admin/docente/docente-edit/docente-edit.component';
import { DocenteShowComponent } from './admin/docente/docente-show/docente-show.component';

export const routes: Routes = [

    { path:'', component:HomeComponent}, 
    //{ path:'user', component:UsersComponent},
    {path: 'login',component:LoginComponent},
    {path: 'dashboard',component:PrincipalComponent},
    {path: 'register',component:RegisterComponent},

    {path: 'facultad/index',component:FacultadIndexComponent},
    {path: 'facultad/show',component:FacultadShowComponent},
    {path: 'facultad/show',component:FacultadIndexComponent},
    
    

    {path: 'docente/index',component:DocenteIndexComponent},
    {path: 'docente/create',component:DocenteCreateComponent},
    {path: 'docente/edit',component:DocenteEditComponent},
    {path: 'docente/show',component:DocenteShowComponent},
    


    
    
    
    {path: 'errorpage',component:ErrorpageComponent},

];
