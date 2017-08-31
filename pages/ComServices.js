import Page from "./Page"
import CityChanger from './CityChanger'

export default class ComServices extends Page {

    isAt = () => EC.visibilityOf(element(by.cssContainingText('div', 'Коммунальные платежи')))

    citySelector = $('span.payment-page__title_inner')

    servicesListSelector = by.css('ul.ui-menu li')
    
    cityChanger = new CityChanger()

    goTo = () => this.getRelativeUrl('/categories/kommunalnie-platezhi/')

    goToCityChanger = async () => {
        await this.citySelector.waitAndClick()
        await this.cityChanger.waitUntilAtPage()
        return this.cityChanger
    }
    
    getCityName = async () => { 
        let el = await this.citySelector.waitForVisible()
        return el.getText()
    }

    getFirstServiceElement = async () => {
        await element(this.servicesListSelector).waitForVisible()
        let els = await element.all(this.servicesListSelector)
        let first = els[0]
        await first.waitForVisible()
        return first
    }

}