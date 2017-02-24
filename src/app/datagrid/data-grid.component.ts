import { Component, AfterContentInit, ContentChildren, QueryList, ChangeDetectorRef, Subscription } from '@angular/core';
import { ColumnComponent } from './column.component';

@Component({
  selector: 'data-grid', 
  templateUrl: './data-grid.component.html'
})
export class DataGridComponent implements AfterContentInit {
  @ContentChildren(ColumnComponent) private cols: QueryList<ColumnComponent>;

  public columns: ColumnComponent[];

  public columnsSubscription: Subscription;

  public rows: Array<any> = [
    { title: "Some title" },
    { title: "Another title <b>With Html</b>" }
  ];

  constructor(public changeDetector: ChangeDetectorRef) {
  }

  public ngAfterContentInit() {
    this.initColumns();
  }

  private initColumns() {
    this.columns = this.cols.toArray();

    this.columnsSubscription = this.cols.changes.subscribe(() => {
      this.initColumns();
      this.changeDetector.markForCheck();
    });
  }

  public isSorted(col:ColumnComponent) {
    return false;
  }
}
