import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataGridComponent } from './data-grid.component';
import { ColumnComponent } from './column.component';
import { HeadersComponent } from './headers.component';
import { RowsComponent } from './rows.component';
import { FiltersComponent } from './filters.component';
import { ActionComponent } from './action.component';

import { DgTemplateDirective } from '../templates';
import { TemplateLoaderDirective } from './template-loader.directive';

import { DynamicsModule }    from '../dynamics/dynamics.module';
import { COMPILER_PROVIDERS } from '@angular/compiler';

let components = [
    DataGridComponent,
    ColumnComponent,
    HeadersComponent,
    RowsComponent,
    TemplateLoaderDirective,
    DgTemplateDirective,
    FiltersComponent,
    ActionComponent
];

@NgModule({
    exports: components,
    declarations: components,
    imports: [
        CommonModule,
        DynamicsModule.forRoot() // singletons
    ],
    providers: [
        COMPILER_PROVIDERS // this is an app singleton declaration
    ]
})
export class DataGridModule { }