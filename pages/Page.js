import { waitUntilDisplayedTimeout, BaseUrl } from '../testConfig.js'
/**
 * Base page class for other components to inherit from.
 */
export default class Page {
    /**
     * This property is needed for the common isDisplayed and waitUntilDisplayed functions
     * @type {ElementFinder}
     */
    selector = undefined

    constructor(selector = undefined) {
      this.selector = selector
    }
  
    selectorGuard = () => {
      if (this.selector === undefined) {
        throw new TypeError(
          `Class '${this.constructor.name}' ` +
            "extends 'Page' class have to implement property 'selector' " +
            "when 'isDisplayed' or 'waitUntilDisplayed' are used",
        )
      }
    }
  
    /**
     * @returns bool of visibility of selector
     */
    isDisplayed = () => {
      this.selectorGuard()
      const until = protractor.ExpectedConditions
      return until.visibilityOf(this.selector)()
    }
  
    /**
     * Wait until the current page is displayed.
     */
    waitUntilDisplayed = () => {
      this.selectorGuard()
  
      browser.wait(
        this.isDisplayed,
        waitUntilDisplayedTimeout,
        `Failed while waiting for "${this.selector.locator()}" of 'Page' class 
        '${this.constructor.name}' to display.`
      )
    }

    get = (relativeUrl) => {
        browser.baseUrl = BaseUrl
        browser.get(relativeUrl)
        this.waitUntilDisplayed()
        return this
    }    

    maximize = () => { 
        browser.manage().window().maximize()
        return this
    }

  }