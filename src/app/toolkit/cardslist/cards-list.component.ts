import { Component, AfterContentInit, ContentChild, QueryList, ChangeDetectorRef, OnInit, Input } from '@angular/core';

import { RestListConnectable } from '../mixins';

@Component({
  selector: 'cards-list',
  templateUrl: './cards-list.component.html'
})
export class CardsListComponent extends RestListConnectable {

  //@ContentChild(CardComponent) private card: CardComponent;

}
