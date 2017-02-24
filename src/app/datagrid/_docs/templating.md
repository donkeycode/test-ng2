# Templating for datas

```` ts
import { Templating } from './datagrid/dynamics/templates.provider';

TemplatesProvider.set(columnType: string, part: string, code: string);
TemplatesProvider.get(columnType: string, part: string): Promise<string>;

// Examples

// Defaults templates
TemplatesProvider.set('default', 'headerTemplate', '{{ column.translationKey }}__TODO');
TemplatesProvider.set('default', 'bodyTemplate', '{{ item[column.mappedOn] }}');
TemplatesProvider.set('default', 'filterTemplate', '<input type="text" [name]="column.mappedOn" />');

// Some others
TemplatesProvider.set('html', 'bodyTemplate', '<div [innerHTML]=item[column.mappedOn]><</div>');
````