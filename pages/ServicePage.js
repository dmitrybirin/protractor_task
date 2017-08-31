import Page from "./Page"
import CityChanger from './CityChanger'
// import InputObject from './InputObject'

const inputObject = (selector) => ({
    input: selector.element(by.css('input')),
    validation: selector.element(by.css('.ui-form-field-error-message'))
})

export default class ServicePage extends Page {

    firstTab = element(by.cssContainingText('.ui-menu-second__items li span', 'Узнать задолженность'))
    secondTab = element(by.cssContainingText('.ui-menu-second__items li span', 'Оплатить'))

    isAt = () => (EC.visibilityOf(this.firstTab) && EC.visibilityOf(this.secondTab))

    payerCodeInput = inputObject($('.ui-form__row_text'))

}