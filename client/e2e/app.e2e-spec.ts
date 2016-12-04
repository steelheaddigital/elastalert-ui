/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

import { ClientMigrationnPage } from './app.po';

describe('client-migrationn App', function() {
  let page: ClientMigrationnPage;

  beforeEach(() => {
    page = new ClientMigrationnPage();
  });

  it('should display Home Page', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Home Page');
  });
});
