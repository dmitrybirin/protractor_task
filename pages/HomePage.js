import Page from './Page'

export default class HomePage extends Page {

    isAt = () => EC.visibilityOf($('div.rci_status_wrapper')) 
    
    links = {
        payments: $('ul#mainMenu').element(by.linkText("ПЛАТЕЖИ"))
    }
    
    goTo = () => {
        this.maximize()
        return this.getRelativeUrl('/')
    }

    getLinkTexts = () => this.getElementsTexts(this.mainMenuLinksSelector)

}