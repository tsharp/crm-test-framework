module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'requirejs'],
        files: [
            {pattern: 'lib/**/*.js', included: false},
            {pattern: 'src/**/*.js', included: false},
            {pattern: 'test/**/*Spec.js', included: false},
            'test/test-main.js',
        ],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/*.js': ['coverage']
        },
        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },
        exclude: ['lib/almond.js'],
        preprocessors: {},
        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [/*'Chrome', 'Firefox', 'IE',*/ 'PhantomJS'],
        singleRun: true,

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 120000,
        browserNoActivityTimeout: 10000
    });
};