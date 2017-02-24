import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataGridComponent } from './data-grid.component';
import { ColumnComponent } from './column.component';
import { HeadersComponent } from './headers.component';
import { RowsComponent } from './rows.component';
import { TemplateLoaderDirective } from './template-loader.directive';
import { DgTemplateDirective } from './template.directive';

import { DynamicsModule }    from './dynamics/dynamics.module';
import { COMPILER_PROVIDERS } from '@angular/compiler';

let components = [
    DataGridComponent,
    ColumnComponent,
    HeadersComponent,
    RowsComponent,
    TemplateLoaderDirective,
    DgTemplateDirective
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