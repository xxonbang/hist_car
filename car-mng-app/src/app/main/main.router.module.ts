import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { HistoryInputComponent } from '../history-input/history-input.component';
import { HistorySearchComponent } from '../history-search/history-search.component';
import { CarManagementComponent } from '../car-management/car-management.component';


export const MainRoutes: Routes = [
    {path: 'main', component: MainComponent,
        children: [
            { path: 'history-input', component: HistoryInputComponent },
            { path: 'history-search', component: HistorySearchComponent },
            { path: 'car-management', component: CarManagementComponent },
        ]
    }
];

export const MainRouterModule = RouterModule.forChild(MainRoutes);