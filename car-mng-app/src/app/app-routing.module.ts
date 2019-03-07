import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HistoryInputComponent } from './history-input/history-input.component';
import { HistorySearchComponent } from './history-search/history-search.component';
import { CarManagementComponent } from './car-management/car-management.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'main', component: MainComponent},
  {path: 'history-input', component: HistoryInputComponent},
  {path: 'history-search', component: HistorySearchComponent},
  {path: 'car-management', component: CarManagementComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
