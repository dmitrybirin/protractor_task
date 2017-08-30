import HomePage from './pages/HomePage'
import PaymentsPage from './pages/PaymentsPage'

const homePage = new HomePage()


describe('Protractor Demo Test', () => {
    
    describe("homepage", () => {

      describe("when on homepage", () => {
        
        beforeAll( async () => {
          await homePage.get()
        })
    
        const pauseFunc = (t) => new Promise((res,rej) => setTimeout(()=>res('sup'), t*1000))

        it("click", async () => {
          await homePage.clickFirstLinkByName('Платежи')
          let page = new PaymentsPage()
          await page.waitUntilDisplayed()
        })

      })
    })
  })