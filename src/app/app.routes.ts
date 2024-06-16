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
import { FacultadEditComponent } from './admin/facultad/edit/facultadEdit.component';
import { FacultadCreateComponent } from './admin/facultad/create/facultadCreate.component';
//import { CarreraindexComponent } from './admin/Carrera/carreraindex/carreraindex.component';
import { CarreraeditComponent } from './admin/Carrera/carreraedit/carreraedit.component';
import { ModuloindexComponent } from './admin/Modulo/moduloindex/moduloindex.component';
import { ModulocreateComponent } from './admin/Modulo/modulocreate/modulocreate.component';
//import { AulaindexComponent } from './admin/Aula/aulaindex/aulaindex.component';
import { MateriaindexComponent } from './admin/Materia/materiaindex/materiaindex.component';
import { ModuloeditComponent } from './admin/Modulo/moduloedit/moduloedit.component';
import { MateriacreateComponent } from './admin/Materia/materiacreate/materiacreate.component';
import { MateriaeditComponent } from './admin/Materia/materiaedit/materiaedit.component';
import { CarreracreateComponent } from './admin/Carrera/carreracreate/carreracreate.component';
import { AulacreateComponent } from './admin/Aula/aulacreate/aulacreate.component';
import { AulaeditComponent } from './admin/Aula/aulaedit/aulaesit.component';
import { HorarioindexComponent } from './admin/horario/horarioindex/horarioindex.component';
import { HorariocreateComponent } from './admin/horario/horariocreate/horariocreate.component';
import { GrupoindexComponent } from './admin/grupo/grupoindex/grupoindex.component';
import { GrupocreateComponent } from './admin/grupo/grupocreate/grupocreate.component';
import { HorarioeditComponent } from './admin/horario/horarioedit/horarioedit.component';

export const routes: Routes = [

    { path:'', component:LoginComponent}, 
    //{ path:'user', component:UsersComponent},
    //{path: 'login',component:LoginComponent},
    {path: 'dashboard',component:PrincipalComponent},
    {path: 'register',component:RegisterComponent},

    {path: 'facultad/index',component:FacultadIndexComponent},
    {path: 'facultad/show/:id',component:FacultadShowComponent},
    {path: 'facultad/create',component:FacultadCreateComponent},
    {path: 'facultad/edit/:id',component:FacultadEditComponent},
    
    

    {path: 'docente/index',component:DocenteIndexComponent},
    {path: 'docente/create',component:DocenteCreateComponent},
    {path: 'docente/edit/:id',component:DocenteEditComponent},
    {path: 'docente/show/:id',component:DocenteShowComponent},
    


   // {path: 'carrera/index',component:CarreraindexComponent},
    {path: 'carrera/create',component:CarreracreateComponent},
    {path: 'carrera/edit/:id',component:CarreraeditComponent},

    {path: 'modulo/index',component:ModuloindexComponent},
    {path: 'modulo/create',component:ModulocreateComponent},
    {path: 'modulo/edit/:id',component:ModuloeditComponent},

    
    {path: 'materia/index',component:MateriaindexComponent},
    {path: 'materia/create',component:MateriacreateComponent},
    {path: 'materia/edit/:id',component:MateriaeditComponent},

    //{path: 'aula/index',component:AulaindexComponent},
    {path: 'aula/create',component:AulacreateComponent},
    {path: 'aula/edit/:id',component:AulaeditComponent},

     

    {path: 'horario/index',component:HorarioindexComponent},
    {path: 'horario/create',component:HorariocreateComponent},
    {path: 'horario/edit/:id',component:HorarioeditComponent},

   {path: 'grupo/index',component:GrupoindexComponent},
   {path: 'grupo/create',component:GrupocreateComponent},

    
    {path: 'errorpage',component:ErrorpageComponent},

];
