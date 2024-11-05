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
import { CommonModule, DatePipe } from '@angular/common';
import { AgGridComponent } from './modules/shared/components/ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared/shared.module';
import { RepoDetailsComponent } from './component/repo-details/repo-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    ConectivityComponent,
    RepoDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    AgGridModule,
    NgxSpinnerModule,
    AuthModule.forRoot({
      domain: 'YOUR_AUTH0_DOMAIN',
      clientId: 'YOUR_AUTH0_CLIENT_ID',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    FontAwesomeModule,
  ],
  exports:[NgxSpinnerModule],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
