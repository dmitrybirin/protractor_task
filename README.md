# Protractor task
Automate not AngularJs site with protractor.
Work In Progress.

## Install
```
npm install
npm run webdriver-update
```
## Run
```
npm test
```

## Notes taken
Protractor with 

- browser.waitForAngularEnabled(false)
- browser.ignoreSynchronization = true
- SELENIUM_PROMISE_MANAGER: false

is loosing the best features and looks like overkill

Considering use WebDriver.io or native Webdriver JS bindings.
Also Nightwatch could be useful.

## What could be done next

- [ ] Separating page tests run
- [ ] Validation tests
- [ ] Navigation header - separate object

