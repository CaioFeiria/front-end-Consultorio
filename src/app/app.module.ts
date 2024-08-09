import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { MedicamentoIndexComponent } from './pages/medicamentos/medicamento-index/medicamento-index.component';
import { MedicamentoEditComponent } from './pages/medicamentos/medicamento-edit/medicamento-edit.component';
import { MedicamentoCreateComponent } from './pages/medicamentos/medicamento-create/medicamento-create.component';
import { ContainerComponent } from './shared/container/container.component';
import { Mensagem404Component } from './pages/mensagens/mensagem404/mensagem404.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PacienteIndexComponent } from './pages/pacientes/paciente-index/paciente-index.component';
import { PacienteCreateComponent } from './pages/pacientes/paciente-create/paciente-create.component';
import { PacienteEditComponent } from './pages/pacientes/paciente-edit/paciente-edit.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AlertComponent } from './shared/dialogs/alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmComponent } from './shared/dialogs/confirm/confirm.component';
import { UsuarioIndexComponent } from './pages/usuarios/usuario-index/usuario-index.component';
import { UsuarioEditComponent } from './pages/usuarios/usuario-edit/usuario-edit.component';
import { UsuarioCreateComponent } from './pages/usuarios/usuario-create/usuario-create.component';
import { LoginComponent } from './pages/login/login.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    MedicamentoIndexComponent,
    MedicamentoEditComponent,
    MedicamentoCreateComponent,
    Mensagem404Component,
    PacienteIndexComponent,
    PacienteCreateComponent,
    PacienteEditComponent,
    AlertComponent,
    ConfirmComponent,
    UsuarioIndexComponent,
    UsuarioEditComponent,
    UsuarioCreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
