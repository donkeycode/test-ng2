// App
export * from './app.module';

import { Configurator } from './datagrid/configurator';
import { XLargeDirective } from './home/x-large';

Configurator.setConfig({
    apiUrl: 'http://localhost:3000'
});

import { TemplatesProvider } from './datagrid/dynamics/templates.provider';

TemplatesProvider.set('hodor', 'bodyTemplate', '<span x-large>{{ column.mappedOn }}</span>HODOR HODOR {{ item[column.mappedOn] }}', {
    imports: [ XLargeDirective ]
});


import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';

const restServer = new FakeRest.FetchServer('http://localhost:3000');
restServer.init({
    'authors': [
        { id: 0, first_name: 'Leo', last_name: 'Tolstoi' },
        { id: 1, first_name: 'Jane', last_name: 'Austen' }
    ],
    'books': [
        { id: 0, author_id: 0, title: 'Anna Karenina' },
        { id: 1, author_id: 0, title: 'War and Peace' },
        { id: 2, author_id: 1, title: 'Pride and Prejudice' },
        { id: 3, author_id: 1, title: 'Sense and <b>Sensibility</b>' }
    ]
});

restServer.toggleLogging(); // logging is off by default, enable it
fetchMock.mock('^http://localhost:3000', restServer.getHandler());
    //return () => fetchMock.restore();
    