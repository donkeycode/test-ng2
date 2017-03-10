import { Component, AfterContentInit, ContentChildren, QueryList, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { ColumnComponent, ActionComponent, GET_LIST, RestListConnectable } from '../core';
import { Configurator } from '../configurator';


@Component({
  selector: 'data-grid',
  styleUrls: [ './data-grid.component.scss' ],
  templateUrl: './data-grid.component.html'
})
export class DataGridComponent extends RestListConnectable implements AfterContentInit {

  @ContentChildren(ColumnComponent) protected cols: QueryList<ColumnComponent>;

  @ContentChildren(ActionComponent) protected acts: QueryList<ActionComponent>;

  constructor(public changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  public onColumnDragStart() {}
  public onColumnDragover() {}
  public onColumnDragleave() {}
  public onColumnDrop() {}
  public onFilerMousedown() {}
  public onFilerKeydown() {}
  public onHeaderMousedown() {}
  public onHeaderKeydown() {}

  public initColumns() {
    this.columns = this.cols.toArray();

    this.columnsSubscription = this.cols.changes.subscribe(() => {
      this.initColumns();
      this.changeDetector.markForCheck();
    });
  }

  public initActions() {
    this.actions = this.acts.toArray();

    this.actionsSubscription = this.acts.changes.subscribe(() => {
      this.initActions();
      this.changeDetector.markForCheck();
    });
  }
}
