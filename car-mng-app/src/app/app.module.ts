import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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

import { FormsModule } from '@angular/forms';

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
    FormsModule,
    MatCheckboxModule,
    HttpClientModule
  ],

  exports: [

  ],

  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
