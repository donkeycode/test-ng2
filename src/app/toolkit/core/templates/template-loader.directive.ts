import { Directive, ComponentFactory, Input, EmbeddedViewRef, ViewContainerRef, OnInit, OnDestroy, ContentChild, TemplateRef, ComponentRef, SimpleChange} from '@angular/core';
import { ColumnComponent } from '../column.component';
import { ActionComponent } from '../action.component';
import { IHaveDynamicData, DynamicTypeBuilder } from '../dynamics';
import { TemplatesProvider } from './templates.provider';
import { RestListConnectable } from '../mixins';

@Directive({
    selector: '[template-loader]'
})
export class TemplateLoaderDirective implements OnInit, OnDestroy {

    @Input() public type: string;

    @Input() public column: ColumnComponent;

    @Input() public action: ActionComponent;

    @Input() public parent: RestListConnectable;

    @Input() public item: any;

    public view: EmbeddedViewRef<any>;

    protected componentRef: ComponentRef<IHaveDynamicData>;

    constructor(public viewContainer: ViewContainerRef, protected typeBuilder: DynamicTypeBuilder) {}

    public ngOnInit() {
        if (this.column && this.column[this.type]) {
            this.view = this.viewContainer.createEmbeddedView(this.column[this.type], {
                column: this.column,
                item: this.item,
                parent: this.parent
            });
        }

        if (this.action && this.action[this.type]) {
            this.view = this.viewContainer.createEmbeddedView(this.action[this.type], {
                action: this.action,
                item: this.item,
                parent: this.parent
            });
        }
    }

    // this is the best moment where to start to process dynamic stuff
    public ngAfterViewInit(): void
    {
        this.useDefaultTemplate();
    }

    public ngOnDestroy() {
        if (this.view) {
          this.view.destroy();
        }

        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }

    protected useDefaultTemplate() {
        if (this.column && this.column[this.type]) {
            return;
        }

        if (this.action && this.action[this.type]) {
            return;
        }

        if (this.componentRef) {
            this.componentRef.destroy();
        }

        // here we get a TEMPLATE with dynamic content === TODO
        return TemplatesProvider.get(this.column ? this.column.type : (this.action? this.action.type : 'default'), this.type).then((template) => {
            // here we get Factory (just compiled or from cache)
            return this.typeBuilder
                .createComponentFactory(template)
                .then((factory: ComponentFactory<IHaveDynamicData>) => {
                // Target will instantiate and inject component (we'll keep reference to it)
                this.componentRef = this
                    .viewContainer
                    .createComponent(factory);

                // let's inject @Inputs to component instance
                let component: IHaveDynamicData = this.componentRef.instance;
                component.column = this.column;
                component.action = this.action;
                component.item = this.item
                component.parent = this.parent;
                //...

                return new Promise((res, rej) => {
                    res();
                });
            });
        }, (msg) => { throw msg; })
  }
}
