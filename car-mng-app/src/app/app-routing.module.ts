import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HistoryInputComponent } from './history-input/history-input.component';
import { HistorySearchComponent } from './history-search/history-search.component';
import { CarManagementComponent } from './car-management/car-management.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'history-input', component: HistoryInputComponent },
  { path: 'history-search', component: HistorySearchComponent },
  { path: 'car-management', component: CarManagementComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
