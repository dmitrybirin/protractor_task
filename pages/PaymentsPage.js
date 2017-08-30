import Homepage from "./Homepage"
import Page from "./Page"

export default class PaymentsPage extends Page {

  isAt = () => EC.visibilityOf($('.ui-menu_icons'))

  linksSelector = by.css('ui-menu_icons a')

  getFirstLinkByName = async (name) => {let els = await this.getElementsByTextInArea(this.linksSelector, name); els[0]}

}