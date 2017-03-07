// From http://plnkr.co/edit/wh4VJG?p=preview
import { Component, ComponentFactory, NgModule, Input, Injectable, ContentChild} from '@angular/core';
import { JitCompiler } from '@angular/compiler';
import { DynamicsModule } from '../dynamics/dynamics.module';
import { DgTemplateDirective } from '../templates';
import { ColumnComponent } from './column.component';
import { ActionComponent } from './action.component';
import { RestListConnectable } from '../mixins';

export interface IHaveDynamicData {
    column: ColumnComponent;

    action: ActionComponent;

    template: DgTemplateDirective;

    parent: RestListConnectable;

    item: any;
}

@Injectable()
export class DynamicTypeBuilder {

  // wee need Dynamic component builder
  constructor(
    protected compiler: JitCompiler
  ) {}

  // this object is singleton - so we can use this as a cache
  private static _cacheOfFactories: {[templateKey: string]: ComponentFactory<IHaveDynamicData>} = {};

  public createComponentFactory(template) : Promise<ComponentFactory<IHaveDynamicData>> {
    let factory = DynamicTypeBuilder._cacheOfFactories[template.template];

    if (factory) {
        // console.log("Module and Type are returned from cache")

        return new Promise((resolve) => {
            resolve(factory);
        });
    }

    // unknown template ... let's create a Type for it
    let type   = this.createNewComponent(template.template);
    let module = this.createComponentModule(type, template.diOptions);

    return new Promise((resolve) => {
        let moduleWithFactories = this.compiler
            .compileModuleAndAllComponentsSync(module);

        factory = moduleWithFactories.componentFactories.find((element) => {
            return element.componentType === type;
        });

        DynamicTypeBuilder._cacheOfFactories[template.template] = factory;

        resolve(factory);

    });
  }

  protected createNewComponent(tmpl:string) {
      @Component({
          selector: 'dynamic-component',
          template: tmpl,
      })
      class CustomDynamicComponent implements IHaveDynamicData {
          @Input()  public column: ColumnComponent;

          @Input()  public action: ActionComponent;

          @Input()  public parent: RestListConnectable;

          @Input()  public item: any;
      };
      // a component for this particular template
      return CustomDynamicComponent;
  }

  protected createComponentModule(componentType: any, options: {} = {}) {
      @NgModule({
        imports: [
          DynamicsModule, // there are 'html-column text-column'...
        ].concat(options.imports || []),
        declarations: [
          componentType
        ],
      })
      class RuntimeComponentModule
      {
      }
      // a module for just this Type
      return RuntimeComponentModule;
  }
}
