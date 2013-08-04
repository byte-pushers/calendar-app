basePath = '../../../';

files = [
    JASMINE,
    JASMINE_ADAPTER,
    'src/main/webapp/lib/angular/angular.js',
    'src/main/webapp/lib/angular/angular-*.js',
    'src/main/webapp/lib/jquery/jquery-1.7.2.js',
    'src/main/webapp/js/com.noesiscode.js',
    'src/main/webapp/js/com.noesiscode.extentions.ObjectExtention.js',
    'src/main/webapp/js/com.noesiscode.extentions.StringExtention.js',
    'src/main/webapp/js/com.noesiscode.extentions.DateExtention.js',
    'src/main/webapp/js/com.noesiscode.exceptions.Errors.js',
    'src/main/webapp/js/com.noesiscode.utils.NumberUtility.js',
    'src/main/webapp/js/com.noesiscode.utils.converters.date.DateConverter.js',
    'src/main/webapp/js/com.noesiscode.models.Person.js',
    'src/main/webapp/js/com.noesiscode.calendar.CalendarAPI.js',
    'src/main/webapp/js/com.noesiscode.calendar.utils.MonthUtility.js',
    'src/main/webapp/js/com.noesiscode.calendar.models.exceptions.Errors.js',
    'src/main/webapp/js/com.noesiscode.calendar.models.Event.js',
    'src/main/webapp/js/com.noesiscode.calendar.models.EventTransformer.js',
    'src/main/webapp/js/com.noesiscode.calendar.models.Day.js',
    'src/main/webapp/js/com.noesiscode.calendar.models.Week.js',
    'src/main/webapp/js/com.noesiscode.calendar.models.Month.js',
    'src/main/webapp/js/angular/com.noesiscode.calendar.app.js',
    'src/main/webapp/js/angular/com.noesiscode.calendar.controllers.js',
    'src/main/webapp/js/angular/com.noesiscode.calendar.directives.js',
    'src/main/webapp/js/angular/com.noesiscode.calendar.services.js',
    'src/test/lib/angular/angular-mocks.js',
    'src/test/unit/Tester.js',
    'src/test/unit/jasmine/TesterSpec.js',
    'src/test/unit/jasmine/DateConverterSpec.js',
    'src/test/unit/jasmine/NumberUtilitySpec.js',
    'src/test/unit/jasmine/NameSpaceSpec.js',
    'src/test/unit/jasmine/ArraySpec.js',
    'src/test/unit/jasmine/CalendarSpec.js',
    'src/test/unit/jasmine/EventSpec.js',
    'src/test/unit/jasmine/PersonSpec.js'
];
// list of files to exclude
exclude = ['src/main/webapp/lib/angular/angular-*.min.js'];

// use dots reporter, as travis terminal does not support escaping sequences
// possible values: 'dots', 'progress', 'junit'
// CLI --reporters progress
reporters = ['dots','junit'];
junitReporter = {
    outputFile: 'target/surefire/test-results.xml'
};

// web server port
// CLI --port 9876
port = 4502;

// cli runner port
// CLI --runner-port 9100
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
// CLI --colors --no-colors
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
// CLI --log-level debug
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
// CLI --auto-watch --no-auto-watch
autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
// CLI --browsers Chrome,Firefox,Safari
browsers = ['src/main/resources/saucelabs-browsers.sh'];

// If browser does not capture in given timeout [ms], kill it
// CLI --capture-timeout 5000
captureTimeout = 5000;

// Auto run tests on start (when browsers are captured) and exit
// CLI --single-run --no-single-run
singleRun = true;

// report which specs are slower than 500ms
// CLI --report-slower-than 500
reportSlowerThan = 500;

// compile coffee scripts
preprocessors = {
    '**/*.coffee': 'coffee'
};