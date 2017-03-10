import { Input } from '@angular/core';
import { DgTemplateDirective } from '../templates';

export abstract class AbstractElement {
    public templates
    @Input() public type: string;
    protected loadTemplates() {
        this.templates.forEach((dgTemplate: DgTemplateDirective) => {
          // @todo check type is valid
          this[dgTemplate.getType()+"Template"] = dgTemplate.template;
        });
    }

    public ngAfterContentInit():void {
      this.loadTemplates();
    }
}
