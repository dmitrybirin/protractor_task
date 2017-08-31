import HomePage from './pages/HomePage'
import PaymentsPage from './pages/PaymentsPage'
import ComServices from './pages/ComServices'
import ServicePage from './pages/ServicePage'

let homePage = new HomePage()
let paymentPage = new PaymentsPage()
let comServicesPage = new ComServices()
let servicePage = new ServicePage()

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

      it("Click on comm. services and wait for it to display", async () =>{
          await paymentPage.servicesLinks.comServices.waitAndClick()
          expect(await comServicesPage.waitUntilAtPage()).toBeTruthy()
      })

    })

    describe("When on Comm. Services", () => {

      it("Assure that the chosen city is Moscow", async () => {
        const moscowText = 'Москве'
        let city = await comServicesPage.getCityName()
        if (city !== moscowText) {
          let cityChanger = await comServicesPage.goToCityChanger()
          await cityChanger.citiesLinks.moscow.waitAndClick()
        }
        expect(await comServicesPage.getCityName()).toBe(moscowText)
      })

      it("Get First Service Element and go to the service page", async () =>{
        let service = await comServicesPage.getFirstServiceElement()
        let serviceName = await service.getText()
        service.waitAndClick()
        expect(await servicePage.waitUntilAtPage()).toBeTruthy()
      })

      it("Validation checks on payment tab", async () => {
          await servicePage.secondTab.waitAndClick()
          const input = servicePage.payerCodeInput.input
          const validation = servicePage.payerCodeInput.validation

          await input.sendKeys('123124', protractor.Key.ENTER)
          expect(await validation.getText()).toBe('Поле неправильно заполнено')
      })

    })
  })