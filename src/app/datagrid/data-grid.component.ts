import { Component, AfterContentInit, ContentChildren, QueryList, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { ColumnComponent } from './column.component';
import { GET_LIST } from './data-providers/types';
import { Configurator } from './configurator';

@Component({
  selector: 'data-grid', 
  templateUrl: './data-grid.component.html'
})
export class DataGridComponent implements AfterContentInit, OnInit {
  @ContentChildren(ColumnComponent) private cols: QueryList<ColumnComponent>;

  @Input() private objects: string;

  @Input('api-url') private apiUrl: string;

  @Input() private source;

  public columns: ColumnComponent[];

  public columnsSubscription;

  public rows: Array<any> = [];

  constructor(public changeDetector: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.connectRest();
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

  private connectRest() {
    let restProvider = this.source || Configurator.getRestProvider()(this.apiUrl || Configurator.apiUrl);
    let results = restProvider(GET_LIST, this.objects, {
      pagination: { page: 1, perPage: 10 },
      sort: { field: 'id', order: 'ASC' },
      filter: {}
    }).then((results) => {
      this.rows = results.data;
    });
  }

  public isSorted(col:ColumnComponent) {
    return false;
  }
}
