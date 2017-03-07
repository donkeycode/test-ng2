import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { CardsListComponent } from './cards-list.component';

let components = [
    CardsListComponent,
];

@NgModule({
    exports: components,
    declarations: components,
    imports: [
        CommonModule,
    ],
    providers: [
        COMPILER_PROVIDERS // this is an app singleton declaration
    ]
})
export class CardsListModule { }
