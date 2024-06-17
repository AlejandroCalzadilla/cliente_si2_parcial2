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
import { authGuard } from './guards/auth.guard';
import { GrupoeditComponent } from './admin/grupo/grupoedit/grupoedit.component';

export const routes: Routes = [

    { path:'', component:LoginComponent}, 
    //{ path:'user', component:UsersComponent},
    //{path: 'login',component:LoginComponent},
    
    {path: 'dashboard',component:PrincipalComponent,canActivate:[authGuard]},
    {path: 'register',component:RegisterComponent},
    {path: 'facultad/index',component:FacultadIndexComponent,canActivate:[authGuard]   },
    {path: 'facultad/show/:id',component:FacultadShowComponent,canActivate:[authGuard]  },
    {path: 'facultad/create',component:FacultadCreateComponent ,canActivate:[authGuard] },
    {path: 'facultad/edit/:id',component:FacultadEditComponent ,canActivate:[authGuard] },
    {path: 'docente/index',component:DocenteIndexComponent  ,canActivate:[authGuard]     },
    {path: 'docente/create',component:DocenteCreateComponent  ,canActivate:[authGuard]   },
    {path: 'docente/edit/:id',component:DocenteEditComponent ,canActivate:[authGuard]    },
    {path: 'docente/show/:id',component:DocenteShowComponent ,canActivate:[authGuard]    },
    {path: 'carrera/create',component:CarreracreateComponent  ,canActivate:[authGuard]   },
    {path: 'carrera/edit/:id',component:CarreraeditComponent  ,canActivate:[authGuard]   },
    {path: 'modulo/index',component:ModuloindexComponent      ,canActivate:[authGuard]   },
    {path: 'modulo/create',component:ModulocreateComponent    ,canActivate:[authGuard]   },
    {path: 'modulo/edit/:id',component:ModuloeditComponent    ,canActivate:[authGuard]   },
    {path: 'materia/index',component:MateriaindexComponent    ,canActivate:[authGuard]   },
    {path: 'materia/create',component:MateriacreateComponent  ,canActivate:[authGuard]  },
    {path: 'materia/edit/:id',component:MateriaeditComponent  ,canActivate:[authGuard]  },
    {path: 'aula/create',component:AulacreateComponent        ,canActivate:[authGuard]  },
    {path: 'aula/edit/:id',component:AulaeditComponent        ,canActivate:[authGuard]  },
    {path: 'horario/index',component:HorarioindexComponent    ,canActivate:[authGuard]      },
    {path: 'horario/create',component:HorariocreateComponent  ,canActivate:[authGuard]      },
    {path: 'horario/edit/:id',component:HorarioeditComponent  ,canActivate:[authGuard]      }  ,
    {path: 'grupo/index',component:GrupoindexComponent        ,canActivate:[authGuard]  },
    {path: 'grupo/create',component:GrupocreateComponent      ,canActivate:[authGuard]      },
    {path: 'grupo/edit/:id',component:GrupoeditComponent      ,canActivate:[authGuard]      },   
    {path: 'errorpage',component:ErrorpageComponent           ,canActivate:[authGuard]  },

];
