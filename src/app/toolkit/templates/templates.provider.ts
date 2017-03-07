import paginationTemplate from './pagination-template.html';
export class TemplatesProvider {

    private static templates = {};

    public static get(columnType: string, part: string): Promise<any> {
        return new Promise((res, rej) => {
            if (!TemplatesProvider.templates[columnType] || !TemplatesProvider.templates[columnType][part]) {
                columnType = 'default'; // Fallback to default
            }

            if (!TemplatesProvider.templates[columnType] || !TemplatesProvider.templates[columnType][part]) {
                return rej('No templates for columnType|actionType "'+ columnType + '" and part "' + part + '"');
            }

            return res(TemplatesProvider.templates[columnType][part]);
        });
    }

    public static set(columnType: string, part: string, code: string, diOptions:{} = {}) {
        if (!TemplatesProvider.templates[columnType]) {
            TemplatesProvider.templates[columnType] = {};
        }

        TemplatesProvider.templates[columnType][part] = { template: code, diOptions: diOptions };
    }
}

// Register some templates
TemplatesProvider.set('default', 'headerTemplate', '{{ column.translationKey }}__TODO');
TemplatesProvider.set('default', 'bodyTemplate', '{{ item[column.mappedOn] }}');
TemplatesProvider.set('default', 'filterTemplate', '<input type="text" [name]="column.mappedOn" [ngModel]="" (ngModelChange)="parent.filter($event, column)"/>');
TemplatesProvider.set('default', 'actionTemplate', '<a (click)="action.onClick(item)">{{ action.type }} TODO</a>');
TemplatesProvider.set('default', 'paginationTemplate', paginationTemplate);

TemplatesProvider.set('html', 'bodyTemplate', '<div [innerHTML]=item[column.mappedOn]></div>');
