import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRouterModule } from './app.router.module';
import { MainModule } from './main/main.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
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
    LoginComponent,
  ],

  imports: [
    BrowserModule,
    AppRouterModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MainModule
  ],

  exports: [

  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: customHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
