import { Component, Input } from '@angular/core';
import { ColumnComponent } from './column.component';
import { ActionComponent } from './action.component';

@Component({
    selector: '[table-row]',
    templateUrl: './rows.component.html'
})
export class RowsComponent {

    @Input() public columns: ColumnComponent[];

    @Input() public actions: ActionComponent[];

    @Input() public item;    
}
