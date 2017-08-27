let SpecReporter = require('jasmine-spec-reporter').SpecReporter

exports.config = {
  browserName: 'chrome',
  directConnect: true,
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:32768/wd/hub',
  specs: ['test.js'],
  //custom reporter for the better expirience
  onPrepare: function () {
    browser.waitForAngularEnabled(false)
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }))
  },
  //hiding dot in report
  jasmineNodeOpts: {
    print: function() {}
 },
}