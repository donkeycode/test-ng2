import { Component, AfterContentInit, ContentChildren, QueryList, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { ColumnComponent, ActionComponent, GET_LIST, RestListConnectable } from '../core';
import { Configurator } from '../configurator';


@Component({
  selector: 'data-grid',
  styleUrls: [ './data-grid.component.scss' ],
  templateUrl: './data-grid.component.html'
})
export class DataGridComponent extends RestListConnectable implements AfterContentInit{

  @ContentChildren(ColumnComponent) private cols: QueryList<ColumnComponent>;

  @ContentChildren(ActionComponent) private acts: QueryList<ActionComponent>;

  public columns: ColumnComponent[];

  public columnsSubscription;

  public actions: ActionComponent[];

  public actionsSubscription;

  constructor(public changeDetector: ChangeDetectorRef) {
    super();
  }

  public ngAfterContentInit() {
    this.initColumns();
    this.initActions();
  }

  private initColumns() {
    this.columns = this.cols.toArray();

    this.columnsSubscription = this.cols.changes.subscribe(() => {
      this.initColumns();
      this.changeDetector.markForCheck();
    });
  }

  private initActions() {
    this.actions = this.acts.toArray();

    this.actionsSubscription = this.acts.changes.subscribe(() => {
      this.initActions();
      this.changeDetector.markForCheck();
    });
  }

  public onColumnDragStart() {}
  public onColumnDragover() {}
  public onColumnDragleave() {}
  public onColumnDrop() {}
  public onFilerMousedown() {}
  public onFilerKeydown() {}
  public onHeaderMousedown() {}
  public onHeaderKeydown() {}

}
