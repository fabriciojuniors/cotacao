import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { NotificacaoComponent } from './notificacao/notificacao.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, NovoUsuarioComponent, NotificacaoComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({swipeBackEnabled: false}), AppRoutingModule, HttpClientModule, MDBBootstrapModule, RouterModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
