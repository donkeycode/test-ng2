import { Component, Input } from '@angular/core';
import { ColumnComponent } from './column.component';

@Component({
    selector: '[table-row]',
    templateUrl: './rows.component.html'
})
export class RowsComponent {

    @Input() public columns: ColumnComponent[];

    @Input() public item;    
}
