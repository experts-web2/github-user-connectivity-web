import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ConectivityComponent } from './component/conectivity/conectivity.component';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ConectivityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    NgxSpinnerModule,
    AuthModule.forRoot({
      domain: 'YOUR_AUTH0_DOMAIN',
      clientId: 'YOUR_AUTH0_CLIENT_ID',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  exports:[NgxSpinnerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
