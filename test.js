import HomePage from './pages/HomePage'
import PaymentsPage from './pages/PaymentsPage'

const homePage = new HomePage()


describe('Protractor Demo Test', () => {
    
    describe("Homepage", () => {

        beforeAll( async () => {
          await homePage.goTo()
        })
        
        const pauseFunc = (t) => new Promise((res,rej) => setTimeout(()=>res('sup'), t*1000))

        it("Click to payment page and wait for it to display", async () => {
          let paymentLink = await homePage.getFirstLinkByName('платежи')
          await paymentLink.click()
          let page = new PaymentsPage()
          expect(await page.waitUntilAtPage()).toBeTruthy()
        })

    })

    describe("Payment page", ()=> {

      it("Click on comm. services and wait for it to display", async () =>{

      })

    })

    describe("When on Comm. Services", () => {

      it("Assure that the chosen city is Moscow", async () => {

      })

      it("Validation checks", async () => {

      })

    })
  })