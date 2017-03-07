import { Component, Inject, forwardRef, Input } from '@angular/core';
import { DataGridComponent } from './data-grid.component';
import { ColumnComponent } from './column.component';

@Component({
    selector: '[headers]',
    templateUrl: './headers.component.html'
})
export class HeadersComponent {

    @Input('headers') public columns: ColumnComponent[];
    @Input() public hasAction:boolean;

    constructor(@Inject(forwardRef(() => DataGridComponent)) public datagrid:DataGridComponent) {}

}
