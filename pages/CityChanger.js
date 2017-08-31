import Page from "./Page"

export default class CityChanger extends Page {

    isAt = () => EC.visibilityOf(element(by.cssContainingText('h3.ui-regions__title', 'Платежи в')))

    citiesLinks = {
        moscow: $('.ui-regions').element(by.cssContainingText('span.ui-link','г. Москва'))
    }

}