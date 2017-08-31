import Homepage from "./Homepage"
import Page from "./Page"

export default class PaymentsPage extends Page {

  isAt = () => EC.visibilityOf($('.ui-menu_icons'))

  goTo = () => this.getRelativeUrl('/payments')

  servicesLinks = {
    comServices: $('.ui-menu_icons').element(by.linkText('Коммунальные платежи'))
  }

}