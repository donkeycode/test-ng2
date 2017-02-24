// From http://plnkr.co/edit/wh4VJG?p=preview
import { Component, ComponentFactory, NgModule, Input, Injectable, ContentChild} from '@angular/core';
import { JitCompiler } from '@angular/compiler';
import { DynamicsModule } from './dynamics/dynamics.module';
import { DgTemplateDirective } from './template.directive';
import { ColumnComponent } from './column.component';

export interface IHaveDynamicData { 
    entity: ColumnComponent;

    template: DgTemplateDirective;

    item: any;
}

@Injectable()
export class DynamicTypeBuilder {

  // wee need Dynamic component builder
  constructor(
    protected compiler: JitCompiler
  ) {}
    
  // this object is singleton - so we can use this as a cache
  private _cacheOfFactories: {[templateKey: string]: ComponentFactory<IHaveDynamicData>} = {};
  
  public createComponentFactory(template: string) : Promise<ComponentFactory<IHaveDynamicData>> {
    let factory = this._cacheOfFactories[template];

    if (factory) {
        console.log("Module and Type are returned from cache")
       
        return new Promise((resolve) => {
            resolve(factory);
        });
    }
    
    // unknown template ... let's create a Type for it
    let type   = this.createNewComponent(template);
    let module = this.createComponentModule(type);
    
    return new Promise((resolve) => {
        this.compiler
            .compileModuleAndAllComponentsAsync(module)
            .then((moduleWithFactories) =>
            {
                factory = moduleWithFactories.componentFactories.find((element) => { 
                    return element.componentType === type;
                });

                this._cacheOfFactories[template] = factory;

                resolve(factory);
            });
    });
  }
  
  protected createNewComponent(tmpl:string) {
      @Component({
          selector: 'dynamic-component',
          template: tmpl,
      })
      class CustomDynamicComponent implements IHaveDynamicData {
          @Input()  public column: ColumnComponent;

          @Input()  public item: any;
      };
      // a component for this particular template
      return CustomDynamicComponent;
  }

  protected createComponentModule(componentType: any) {
      @NgModule({
        imports: [
          DynamicsModule, // there are 'html-column text-column'...
        ],
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