import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { StoreModule } from '@ngrx/store';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { DrawerComponent } from './nav/drawer/drawer.component';

import { environment } from '../environments/environment';
import { UserCardComponent } from './nav/user-card/user-card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DrawerComponent,
    UserCardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AuthModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
