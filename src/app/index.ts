// App
export * from './app.module';

import { Configurator } from './toolkit/configurator';
import { XLargeDirective } from './home/x-large';

Configurator.setConfig({
    apiUrl: 'http://localhost:3000'
});

import { TemplatesProvider } from './toolkit/core/templates';

TemplatesProvider.set('hodor', 'bodyTemplate',
  'HODOR {{ item[element.mappedOn] }}', {
  // @TODO  imports: [ XLargeDirective ]
});

import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';

const restServer = new FakeRest.FetchServer('http://localhost:3000');
let books = []
for(let i = 0; i < 4000; i++) {
  books.push({ id: i, author_id: 0, title: 'item num '+i, actif: (i%2==0), date: Date() })
}
restServer.init({
    'authors': [
        { id: 0, first_name: 'Leo', last_name: 'Tolstoi' },
        { id: 1, first_name: 'Jane', last_name: 'Austen' }
    ],
    'books': books
});

restServer.toggleLogging(); // logging is off by default, enable it
fetchMock.mock('^http://localhost:3000', restServer.getHandler());
    // return () => fetchMock.restore();
