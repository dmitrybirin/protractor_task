import HomePage from './pages/HomePage'
import PaymentsPage from './pages/PaymentsPage'
import ComServices from './pages/ComServices'

let homePage = new HomePage()
let paymentPage = new PaymentsPage()
let comServicesPage = new ComServices()


describe('Protractor Demo Test', () => {

  const pauseFunc = (t) => new Promise((res,rej) => setTimeout(()=>res('sup'), t*1000))
  
    describe("Homepage", () => {

        beforeAll( async () => {
          await homePage.goTo()
        })
        
        it("Click to payment page and wait for it to display", async () => {
          await homePage.links.payments.waitAndClick()
          expect(await paymentPage.waitUntilAtPage()).toBeTruthy()
        })

    })

    describe("Payment page", ()=> {
      
      beforeAll( async () => {
        if (!paymentPage.isAt()) {
          console.log('Payment page not available, going to it...')
          await paymentPage.goTo()
        }
      })

      it("Click on comm. services and wait for it to display", async () =>{
          await paymentPage.servicesLinks.comServices.waitAndClick()
          expect(await comServicesPage.waitUntilAtPage()).toBeTruthy()
      })

    })

    describe("When on Comm. Services", () => {

      it("Assure that the chosen city is Moscow", async () => {
        let city = await comServicesPage.getCityName()
        if (city !== 'Москва') {
            let texts = await comServicesPage.changeCityTo()
            console.log(texts)
        }
      })

      it("Validation checks", async () => {
          await pauseFunc(10)
      })

    })
  })