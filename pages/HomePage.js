import Page from './Page'

export default class HomePage extends Page {

    selector = element(by.css("#mainMenu"))
 
    get = () => {
        this.maximize()
        this.getRelativeUrl('/')
    }

}