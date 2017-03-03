import { Directive, Input, TemplateRef } from '@angular/core';
import { DataGridComponent } from './data-grid.component';
import { ColumnComponent } from './column.component';

@Directive({
    selector: '[dg-template]'
})
export class DgTemplateDirective {
    @Input('dg-template') public name: string;

    constructor(public template: TemplateRef<any>) {}

    public getType(): string {
        return this.name;
    }
}
