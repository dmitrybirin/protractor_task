import { waitUntilDisplayedTimeout, BaseUrl } from '../testConfig.js'
/**
 * Base page class for other components to inherit from.
 */

protractor.ElementFinder.prototype.waitAndClick = async function() {
  await browser.wait(
    EC.elementToBeClickable(this),
    waitUntilDisplayedTimeout,
    `Failed while waiting for the link "${this.locator()}" with text to be clickable.`
  )
  await this.click()
}

protractor.ElementFinder.prototype.waitForVisible = async function() {
  await browser.wait(
    EC.visibilityOf(this),
    waitUntilDisplayedTimeout,
    `Failed while waiting for the link "${this.locator()}" with text to be visible.`
  )
  return this
}

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
        return Promise.all(els.map(async el => {
          await el.waitForVisible()
          let elText = await el.getText()
          return elText.toLowerCase()
        }))
    }

    clickElement = async (el) => {
      await browser.wait(
        EC.elementToBeClickable(el),
        waitUntilDisplayedTimeout,
        `Failed while waiting for the link "${areaSelector}" with text'
        '${text}' to be clickable.`
      )
      await el.click()
    }
  }