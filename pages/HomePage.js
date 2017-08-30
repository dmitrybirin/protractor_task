import Page from './Page'

export default class HomePage extends Page {

    selector = by.css('div.rci_status_wrapper')
    
    mainMenuLinks = by.css('ul#mainMenu a')
    
    get = () => {
        this.maximize()
        return this.getRelativeUrl('/')
    }

    getLinkTexts = async () => this.getElementsTexts(this.mainMenuLinks)

    clickFirstLinkByName = async (name) => {let els = await this.getElementsByTextInArea(this.mainMenuLinks, name); els[0].click()}
    
}