import { HavenPage } from './app.po';

describe('haven App', () => {
  let page: HavenPage;

  beforeEach(() => {
    page = new HavenPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
