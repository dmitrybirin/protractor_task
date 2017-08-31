import { waitUntilDisplayedTimeout, BaseUrl } from '../testConfig.js'

/**
 * Waiting for the element to be clickable and click it
 */
protractor.ElementFinder.prototype.waitAndClick = async function() {
  await browser.wait(
    EC.elementToBeClickable(this),
    waitUntilDisplayedTimeout,
    `Failed while waiting for the link "${this.locator()}" with text to be clickable.`
  )
  await this.click()
}

/**
 * Waiting for the element to be visible and returns the element
 */
protractor.ElementFinder.prototype.waitForVisible = async function() {
  await browser.wait(
    EC.visibilityOf(this),
    waitUntilDisplayedTimeout,
    `Failed while waiting for the link "${this.locator()}" with text to be visible.`
  )
  return this
}

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
  
    /**
     * guard for the isAt function
     */
    atGuard = () => {
      if (this.isAt === undefined) {
        throw new TypeError(
          `Class '${this.constructor.name}' ` +
            "extends 'Page' class has to implement property 'isAt' " +
            "when 'isDisplayed' or 'waitUntilDisplayed' are used",
        )
      }
    }
  
    /**
     * Wait until the current page condition is met.
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

    maximize = () => browser.manage().window().maximize()
    
    /**
     * Getting to the page url and wait until the page is displayed.
     */
    getRelativeUrl = (relativeUrl) => {
        browser.baseUrl = BaseUrl
        browser.get(relativeUrl)
        return this.waitUntilAtPage()
    }    
  }