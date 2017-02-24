import { Component, AfterContentInit, ContentChildren, QueryList, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { ColumnComponent } from './column.component';
import SimpleRestProvider from './data-providers/simple';
import { GET_LIST } from './data-providers/types';

@Component({
  selector: 'data-grid', 
  templateUrl: './data-grid.component.html'
})
export class DataGridComponent implements AfterContentInit, OnInit {
  @ContentChildren(ColumnComponent) private cols: QueryList<ColumnComponent>;

  @Input() private objects: string;

  public columns: ColumnComponent[];

  public columnsSubscription;

  public rows: Array<any> = [];

  constructor(public changeDetector: ChangeDetectorRef) {
  }

  public ngOnInit() {
    let restProvider = SimpleRestProvider('http://localhost:3000');

    let results = restProvider(GET_LIST, this.objects, {
      pagination: { page: 1, perPage: 10 },
      sort: { field: 'id', order: 'ASC' }
    }).then((results) => {
      this.rows = results.data;
    });
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
