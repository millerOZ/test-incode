module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-mocha-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: { random: false },
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' }
      ],
      exclude: [
        'src/app/app.config.ts',
        'src/app/app.routes.ts',
        'src/environments/*'
      ],
      fixWebpackSourcePaths: true,
    },
    reporters: ['mocha', 'kjhtml'],
    browsers: ['ChromeHeadlessCustom'],
    customLaunchers: {
      ChromeHeadlessCustom: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--remote-debugging-port=9222'
        ],
      },
    },
    singleRun: true,
    restartOnFileChange: false,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 60000,
    captureTimeout: 60000,
    processKillTimeout: 10000,
  });
};
