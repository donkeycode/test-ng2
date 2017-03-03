import { Component, AfterContentInit, ContentChildren, QueryList, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { ColumnComponent } from './column.component';
import { ActionComponent } from './action.component';
import { GET_LIST } from '../data-providers/types';
import { Configurator } from '../configurator';

import { RestListConnectable } from '../mixins/rest-list-connectable';
import { TraitDecorator } from '../util/mixins';

@TraitDecorator(RestListConnectable)
@Component({
  selector: 'data-grid', 
  templateUrl: './data-grid.component.html'
})
export class DataGridComponent implements AfterContentInit, OnInit {
  @Input() private objects: string;

  @Input('api-url') private apiUrl: string;

  @Input() private source;
  
  @ContentChildren(ColumnComponent) private cols: QueryList<ColumnComponent>;

  @ContentChildren(ActionComponent) private acts: QueryList<ActionComponent>;

  public columns: ColumnComponent[];

  public columnsSubscription;

  public actions: ActionComponent[];

  public actionsSubscription;

  constructor(public changeDetector: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.connectRest();
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

  public isSorted(col:ColumnComponent) {
    return false;
  }
}
