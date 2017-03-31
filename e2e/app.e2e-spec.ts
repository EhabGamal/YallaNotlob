import { YallaNotlobPage } from './app.po';

describe('yalla-notlob App', () => {
  let page: YallaNotlobPage;

  beforeEach(() => {
    page = new YallaNotlobPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
