import { waitUntilDisplayedTimeout, BaseUrl } from '../testConfig.js'
/**
 * Base page class for other components to inherit from.
 */
export default class Page {
    /**
     * This property is needed for the common isDisplayed and waitUntilDisplayed functions
     * @type {ElementFinder}
     */
    isAt = undefined

    constructor(isAt = undefined) {
      this.isAt = isAt
    }
  
    atGuard = () => {
      if (this.isAt === undefined) {
        throw new TypeError(
          `Class '${this.constructor.name}' ` +
            "extends 'Page' class has to implement property 'isAt' " +
            "when 'isDisplayed' or 'waitUntilDisplayed' are used",
        )
      }
      else if (typeof this.isAt !== 'function'){
        throw new TypeError(
          `Class '${this.constructor.name}' ` +
            "extends 'Page' class has to set property 'isAt' as function"
        )
      }
    }
  
    /**
     * @returns bool of visibility of selector
     */
    isDisplayed = () => {
      this.atGuard()
      return isAt()
    }

    /**
     * Wait until the current page is displayed.
     */
    waitUntilAtPage = () => {
      this.atGuard()
      return browser.wait(
        this.isAt(),
        waitUntilDisplayedTimeout,
        `Failed while waiting for "${this.isAt.toString()}" of 'Page' class 
        '${this.constructor.name}' to come true.`
      )
    }

    getRelativeUrl = (relativeUrl) => {
        browser.baseUrl = BaseUrl
        browser.get(relativeUrl)
        return this.waitUntilAtPage()
    }    

    maximize = () => browser.manage().window().maximize()

    getElementsTexts = async (areaSelector) => {
        const els = await element.all(areaSelector)
        return Promise.all(els.map(el => el.getText().then(elText => elText.toLowerCase())))
    }

    getElementsByTextInArea = async (areaSelector, text) => {
      const els = await element.all(areaSelector)
      Array.prototype.mapAsync = function(fn) {
          return Promise.all(this.map(fn))
      }
      Array.prototype.filterAsync = function(fn) {
          return this.mapAsync(fn).then(_arr => this.filter((v, i) => !!_arr[i]))
      }
      let filtered = await els.filterAsync(async el => el.getText().then(elText => elText.toLowerCase() === text.toLowerCase()))
      return filtered
    }

  }