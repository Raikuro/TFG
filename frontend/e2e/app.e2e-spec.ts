import { TFGPage } from './app.po';

describe('tfg App', () => {
  let page: TFGPage;

  beforeEach(() => {
    page = new TFGPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
