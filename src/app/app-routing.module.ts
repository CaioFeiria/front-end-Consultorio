import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MedicamentoIndexComponent } from './pages/medicamentos/medicamento-index/medicamento-index.component';
import { MedicamentoCreateComponent } from './pages/medicamentos/medicamento-create/medicamento-create.component';
import { MedicamentoEditComponent } from './pages/medicamentos/medicamento-edit/medicamento-edit.component';
import { Mensagem404Component } from './pages/mensagens/mensagem404/mensagem404.component';
import { PacienteIndexComponent } from './pages/pacientes/paciente-index/paciente-index.component';
import { PacienteCreateComponent } from './pages/pacientes/paciente-create/paciente-create.component';
import { PacienteEditComponent } from './pages/pacientes/paciente-edit/paciente-edit.component';
import { UsuarioIndexComponent } from './pages/usuarios/usuario-index/usuario-index.component';
import { UsuarioCreateComponent } from './pages/usuarios/usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './pages/usuarios/usuario-edit/usuario-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { guardGuard } from './guard-Login/guard.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [guardGuard] },
  { path: 'medicamentos', component: MedicamentoIndexComponent, canActivate: [guardGuard] },
  { path: 'medicamentos/create', component: MedicamentoCreateComponent, canActivate: [guardGuard] },
  { path: 'medicamentos/edit/:id', component: MedicamentoEditComponent, canActivate: [guardGuard] },
  { path: 'pacientes', component: PacienteIndexComponent, canActivate: [guardGuard] },
  { path: 'pacientes/create', component: PacienteCreateComponent, canActivate: [guardGuard] },
  { path: 'pacientes/edit/:codigo', component: PacienteEditComponent, canActivate: [guardGuard] },
  { path: 'usuarios', component: UsuarioIndexComponent, canActivate: [guardGuard] },
  { path: 'usuarios/create', component: UsuarioCreateComponent, canActivate: [guardGuard] },
  { path: 'usuarios/edit/:id', component: UsuarioEditComponent, canActivate: [guardGuard] },
  { path: '**', component: Mensagem404Component, canActivate: [guardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
