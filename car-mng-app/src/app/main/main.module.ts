import { NgModule } from '@angular/core';

import { MainRouterModule } from './main.router.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatCheckboxModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';

import { HistoryInputComponent } from '../history-input/history-input.component';
import { HistorySearchComponent } from '../history-search/history-search.component';
import { CarManagementComponent } from '../car-management/car-management.component';


@NgModule({
    imports: [
        MainRouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatSortModule
    ],

    declarations: [
        HistoryInputComponent,
        HistorySearchComponent,
        CarManagementComponent
    ]
})
export class MainModule { }