describe('Protractor Demo Test', function() {

    browser.get('https://tinkoff.ru')
    
    const mainMenuLinks = 'ul#mainMenu a'
  
    it('should have a right title', 
        () => 
        expect(browser.getTitle())
                        .toEqual('Лучший онлайн-банк. Кредитные и дебетовые карты с доставкой на дом.')
    )

    const getElementsByTextInArea = async (areaSelector, text) => await element.all(by.css(areaSelector)).filter(el => el.getText().then(elText => elText.toLowerCase() === text.toLowerCase()))

    it('some test', async function () {
        let els = await getElementsByTextInArea(mainMenuLinks, 'Платежи')
        el = await els[0].click()
        console.log(await browser.getCurrentUrl())
    })

  })

// var until = protractor.ExpectedConditions
// browser.wait(until.presenceOf(elem), 5000, 'Element taking too long to appear in the DOM')