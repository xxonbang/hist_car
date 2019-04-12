import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { HistoryInputComponent } from '../history-input/history-input.component';
import { HistorySearchComponent } from '../history-search/history-search.component';
import { CarManagementComponent } from '../car-management/car-management.component';


export const MainRoutes: Routes = [
    {
        path: 'main', component: MainComponent,
        children: [
            { path: 'history-input', component: HistoryInputComponent },
            { path: 'history-search', component: HistorySearchComponent },
            { path: 'car-management', component: CarManagementComponent },
        ]
    },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }, // 잘못된 URL을 사용했을때 Login 페이지로 돌려보냄.
];

export const MainRouterModule = RouterModule.forChild(MainRoutes);