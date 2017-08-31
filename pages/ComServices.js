import Page from "./Page"
import CityChanger from './CityChanger'

export default class ComServices extends Page {

    isAt = () => EC.visibilityOf(element(by.cssContainingText('div', 'Коммунальные платежи')))

    citySelector = $('span.payment-page__title_inner')
    
    cityChanger = new CityChanger()

    goToCityChanger = async () => {
        await this.citySelector.waitAndClick()
        await this.cityChanger.waitUntilAtPage()
        return this.cityChanger
    }
    
    getCityName = async () => { 
        let el = await this.citySelector.waitForVisible()
        return el.getText()
    }

}