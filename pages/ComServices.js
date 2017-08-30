import Page from "./Page"

export default class ComServices extends Page {

  isAt = () => EC.visibilityOf(element(by.cssContainingText('div', 'Коммунальные платежи')))

}