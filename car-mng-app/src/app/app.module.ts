import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HistoryInputComponent } from './history-input/history-input.component';
import { HistorySearchComponent } from './history-search/history-search.component';
import { CarManagementComponent } from './car-management/car-management.component';
import { LoginComponent } from './login/login.component';

import { MaterialModule } from './material.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatCheckboxModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { customHttpInterceptor } from './app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HistoryInputComponent,
    HistorySearchComponent,
    CarManagementComponent,
    LoginComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],

  exports: [

  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: customHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
