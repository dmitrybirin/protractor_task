import Page from './Page'

class HomePage extends Page {

    isAt = () => EC.visibilityOf($('div.rci_status_wrapper')) 
    
    mainMenuLinksSelector = by.css('ul#mainMenu a')
    
    goTo = () => {
        this.maximize()
        return this.getRelativeUrl('/')
    }

    getLinkTexts = () => this.getElementsTexts(this.mainMenuLinksSelector)

    getFirstLinkByName = async (name) => {let els = await this.getElementsByTextInArea(this.mainMenuLinksSelector, name); return els[0]}
    
}

module.exports = HomePage