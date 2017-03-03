import { Component, AfterContentInit, ContentChild, QueryList, ChangeDetectorRef, OnInit, Input } from '@angular/core';

import { GET_LIST } from '../data-providers/types';
import { Configurator } from '../configurator';

export class RestListConnectable {

  public rows: Array<any> = [];

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
}