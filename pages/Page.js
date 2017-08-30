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
      return protractor.ExpectedConditions.visibilityOf(element(this.selector))
    }

    isCondition = async (condition) => {
      if (!condition) throw new TypeError('condition function must present to get condition status')
      else return condition()
    }


    /**
     * Wait until the current page is displayed.
     */
    waitUntilDisplayed = async () => {
      let el = await element(this.selector)
      this.selectorGuard()
      return browser.wait(
        protractor.ExpectedConditions.visibilityOf(el),
        waitUntilDisplayedTimeout,
        `Failed while waiting for "${el.locator()}" of 'Page' class 
        '${this.constructor.name}' to display.`
      )
    }

    getRelativeUrl = (relativeUrl) => {
        browser.baseUrl = BaseUrl
        browser.get(relativeUrl)
        return this.waitUntilDisplayed()
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
      let filtered = await els.filterAsync(async el => el.getText().then(elText => {console.log(elText); return elText.toLowerCase() === text.toLowerCase()}))
      console.log(filtered.length)
      return filtered
    }

  }