import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { environment } from 'src/environments/environment';
import { RegisterPage } from '../app/register/register.page';
import { LoginPage } from '../app/login/login.page';
import { ReservaPage } from './reserva/reserva/reserva.page';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  declarations: [AppComponent,RegisterPage,LoginPage, ReservaPage],
  entryComponents: [LoginPage,RegisterPage, ReservaPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  CalendarModule],
  
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
